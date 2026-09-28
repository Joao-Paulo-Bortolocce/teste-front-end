import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProductModal } from '../components/ProductModal/ProductModal';

const PRODUCT = {
  productName: 'Iphone 11 PRO MAX BRANCO 1',
  descriptionShort: 'Iphone 11 PRO MAX BRANCO 1',
  photo: 'https://example.com/foto.png',
  price: 1499.9,
};

describe('ProductModal', () => {
  it('exibe foto, nome e preço do produto selecionado', () => {
    render(<ProductModal product={PRODUCT} onClose={() => undefined} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Iphone 11 PRO MAX BRANCO 1')).toBeInTheDocument();
    expect(screen.getByText(/1\.499,90/)).toBeInTheDocument();
    expect(screen.getByAltText('Iphone 11 PRO MAX BRANCO 1')).toHaveAttribute(
      'src',
      'https://example.com/foto.png',
    );
  });

  it('não renderiza nada sem produto', () => {
    render(<ProductModal product={null} onClose={() => undefined} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('fecha pelo X, pelo overlay e pelo Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { rerender } = render(<ProductModal product={PRODUCT} onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: /fechar/i }));
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(<ProductModal product={PRODUCT} onClose={onClose} />);
    await user.click(screen.getByTestId('product-modal-overlay'));
    expect(onClose).toHaveBeenCalledTimes(2);

    rerender(<ProductModal product={PRODUCT} onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('controla a quantidade sem descer de 01', async () => {
    const user = userEvent.setup();
    render(<ProductModal product={PRODUCT} onClose={() => undefined} />);

    expect(screen.getByText('01')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /aumentar/i }));
    expect(screen.getByText('02')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /diminuir/i }));
    await user.click(screen.getByRole('button', { name: /diminuir/i }));
    expect(screen.getByText('01')).toBeInTheDocument();
  });
});
