import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../services/products';
import type { Product } from '../types/product';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseProductsResult {
  products: Product[];
  status: Status;
  error: string | null;
  retry: () => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setError(null);

    fetchProducts(controller.signal)
      .then((items) => {
        setProducts(items);
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar produtos.');
        setStatus('error');
      });

    return () => controller.abort();
  }, [attempt]);

  return { products, status, error, retry };
}
