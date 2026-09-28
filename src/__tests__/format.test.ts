import { describe, expect, it } from 'vitest';
import { formatPrice } from '../utils/format';

describe('formatPrice', () => {
  it('formata valores em BRL pt-BR', () => {
    expect(formatPrice(15000)).toContain('15.000');
    expect(formatPrice(520)).toContain('520');
  });
});
