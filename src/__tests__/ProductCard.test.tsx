import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProductCard } from '../components/ProductCard/ProductCard';

describe('ProductCard', () => {
  it('exibe nome, preço formatado e botão comprar', () => {
    const onSelect = vi.fn();
    render(
      <ProductCard
        product={{
          productName: 'Iphone 11 PRO MAX BRANCO 1',
          descriptionShort: 'Iphone 11 PRO MAX BRANCO 1',
          photo: 'https://example.com/foto.png',
          price: 15000,
        }}
        onSelect={onSelect}
      />,
    );

    expect(screen.getByText('Iphone 11 PRO MAX BRANCO 1')).toBeInTheDocument();
    expect(screen.getByText(/15\.000/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /COMPRAR/i })).toBeInTheDocument();

    // A imagem exibida deve vir do campo photo do JSON.
    const img = screen.getByAltText('Iphone 11 PRO MAX BRANCO 1');
    expect(img).toHaveAttribute('src', 'https://example.com/foto.png');
  });
});
