import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  PRODUCTS_PROXY_URL,
  PRODUCTS_SNAPSHOT_URL,
  fetchProducts,
} from '../services/products';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('fetchProducts', () => {
  it('retorna produtos quando o primário responde com sucesso', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        products: [
          { productName: 'A', descriptionShort: 'A', photo: 'http://x/y.png', price: 10 },
        ],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const products = await fetchProducts();
    expect(products).toHaveLength(1);
    expect(products[0].productName).toBe('A');
    // Em teste (DEV), o primário é o proxy do Vite.
    expect(fetchMock).toHaveBeenCalledWith(PRODUCTS_PROXY_URL, expect.anything());
  });

  it('usa o snapshot local quando o primário falha (ex.: CORS)', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          products: [
            { productName: 'B', descriptionShort: 'B', photo: 'http://x/z.png', price: 20 },
          ],
        }),
      });
    vi.stubGlobal('fetch', fetchMock);

    const products = await fetchProducts();
    expect(products).toHaveLength(1);
    expect(products[0].productName).toBe('B');
    expect(fetchMock).toHaveBeenNthCalledWith(1, PRODUCTS_PROXY_URL, expect.anything());
    expect(fetchMock).toHaveBeenNthCalledWith(2, PRODUCTS_SNAPSHOT_URL, expect.anything());
  });

  it('lança erro quando primário e snapshot falham', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchProducts()).rejects.toThrow(/HTTP 500/);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
