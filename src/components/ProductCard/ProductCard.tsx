import { formatPrice } from '../../utils/format';
import type { Product } from '../../types/product';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
  // Ponto de encaixe do modal (fase 2): quando o modal for entregue,
  // o Showcase passará onSelect para abrir o modal com o produto clicado.
  onSelect?: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  // Todos os dados visíveis vêm do JSON remoto:
  // photo -> <img src>, productName -> alt/título, descriptionShort -> descrição, price -> preço.
  const title = product.productName;
  const description = product.descriptionShort || product.productName;

  return (
    <article className="card" data-testid="product-card" title={title}>
      <button
        type="button"
        className="card__media"
        aria-label={`Ver detalhes de ${title}`}
        onClick={() => onSelect?.(product)}
      >
        <img
          src={product.photo}
          alt={title}
          loading="lazy"
          width={200}
          height={200}
          onError={(e) => {
            // Fallback apenas se a URL do JSON falhar; o primário é sempre product.photo.
            const img = e.currentTarget;
            if (!img.src.endsWith('/assets/product-iphone.png')) {
              img.src = '/assets/product-iphone.png';
            }
          }}
        />
      </button>
      <h3 className="card__desc">{description}</h3>
      <p className="card__old" aria-hidden="true">
        {formatPrice(product.price * 1.3) }
      </p>
      <p className="card__price">{formatPrice(product.price)}</p>
      <p className="card__installments">ou 2x de  {formatPrice(product.price/2) } sem juros</p>
      <p className="card__shipping">Frete grátis</p>
      <button
        type="button"
        className="card__cta"
        data-product-name={product.productName}
        onClick={() => onSelect?.(product)}
      >
        COMPRAR
      </button>
    </article>
  );
}
