import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Categories } from '../components/Categories/Categories';

describe('Categories', () => {
  it('renderiza as 7 categorias com Tecnologia ativa', () => {
    render(<Categories />);

    for (const name of [
      'Tecnologia',
      'Supermercado',
      'Bebidas',
      'Ferramentas',
      'Saúde',
      'Esportes e Fitness',
      'Moda',
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }

    expect(screen.getByText('Tecnologia').closest('a')).toHaveClass('is-active');
  });
});
