import type { Product, ProductsResponse } from '../types/product';

// Fonte oficial exigida pelo teste.
export const PRODUCTS_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';

// Em dev, o Vite faz proxy desse caminho para a URL oficial (ver
// vite.config.ts `server.proxy`). Como a resposta chega pelo mesmo origin,
// o navegador não aplica o bloqueio de CORS.
export const PRODUCTS_PROXY_URL = '/api/produtos.json';

// Snapshot idêntico ao JSON oficial, servido junto com o app. Usado como
// contingência quando a rede/CORS bloqueia a URL remota (ex.: build
// publicado ou servidor fora do ar). Nunca é a fonte primária.
export const PRODUCTS_SNAPSHOT_URL = '/data/produtos.json';

export class ProductsApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductsApiError';
  }
}

function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError';
}

async function getJson(url: string, signal?: AbortSignal): Promise<ProductsResponse> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new ProductsApiError(`Falha ao carregar produtos de ${url} (HTTP ${response.status}).`);
  }

  return (await response.json()) as ProductsResponse;
}

function parseProducts(data: ProductsResponse, source: string): Product[] {
  if (!data || data.success !== true || !Array.isArray(data.products)) {
    throw new ProductsApiError(`Resposta de ${source} em formato inesperado.`);
  }

  return data.products;
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  // Em dev, o primário é o proxy (dados ao vivo, sem CORS).
  // No build, o primário é a URL oficial direta.
  const primary = import.meta.env.DEV ? PRODUCTS_PROXY_URL : PRODUCTS_URL;

  try {
    return parseProducts(await getJson(primary, signal), primary);
  } catch (err) {
    if (isAbortError(err) || signal?.aborted) throw err;

    // Rede/CORS ou HTTP falhou no primário: tenta o snapshot local antes
    // de desistir, para a vitrine nunca ficar vazia por causa do CORS.
    // eslint-disable-next-line no-console
    console.warn(`[products] primário (${primary}) falhou, usando snapshot local.`, err);
    return parseProducts(await getJson(PRODUCTS_SNAPSHOT_URL, signal), PRODUCTS_SNAPSHOT_URL);
  }
}
