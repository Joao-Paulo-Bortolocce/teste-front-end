import { useRef } from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import './Showcase.scss';

const TABS = ['CELULAR', 'ACESSÓRIOS', 'TABLETS', 'NOTEBOOKS', 'TVS', 'VER TODOS'];

interface ShowcaseProps {
  id?: string;
  title: string;
  products: Product[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  onRetry: () => void;
  showTabs?: boolean;
  // Fase 2 (modal): o App passará onSelectProduct para abrir o modal.
  onSelectProduct?: (product: Product) => void;
}

export function Showcase({
  id = 'vitrine',
  title,
  products,
  status,
  error,
  onRetry,
  showTabs = false,
  onSelectProduct,
}: ShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingId = `${id}-title`;

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className="showcase" id={id} aria-labelledby={headingId}>
      <div className="showcase__title-row">
        <h2 id={headingId}>{title}</h2>
      </div>

      {showTabs && (
        <div className="showcase__tabs" role="tablist" aria-label="Filtrar produtos">
          {TABS.map((tab, index) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={index === 0}
              className={index === 0 ? 'is-active' : ''}
              // Tabs são visuais nesta fase: o JSON não traz categoria.
              onClick={() => undefined}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {status === 'loading' && (
        <ul className="showcase__grid" aria-label="Carregando produtos">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="showcase__skeleton" aria-hidden="true" />
          ))}
        </ul>
      )}

      {status === 'error' && (
        <div className="showcase__error" role="alert">
          <p>Não foi possível carregar os produtos. {error}</p>
          <button type="button" onClick={onRetry}>
            Tentar novamente
          </button>
        </div>
      )}

      {status === 'success' && (
        <div className="showcase__carousel">
          <button
            type="button"
            className="showcase__arrow"
            aria-label="Ver produtos anteriores"
            onClick={() => scrollBy(-1)}
          >
            ‹
          </button>
          <div className="showcase__track" ref={trackRef}>
            <ul>
              {products.map((product) => (
                <li key={product.productName}>
                  <ProductCard product={product} onSelect={onSelectProduct} />
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="showcase__arrow"
            aria-label="Ver próximos produtos"
            onClick={() => scrollBy(1)}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
