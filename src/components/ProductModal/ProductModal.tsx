import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { formatPrice } from '../../utils/format';
import type { Product } from '../../types/product';
import './ProductModal.scss';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // Reseta a quantidade e gerencia foco/scroll/Escape a cada abertura.
  useEffect(() => {
    if (!product) return;

    setQuantity(1);
    lastTriggerRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus?.();
    };
  }, [product, onClose]);

  if (!product) return null;

  const paddedQuantity = String(quantity).padStart(2, '0');

  return createPortal(
    <div
      className="modal__overlay"
      data-testid="product-modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="product-modal"
      >
        <button
          ref={closeRef}
          type="button"
          className="modal__close"
          aria-label="Fechar detalhes do produto"
          onClick={onClose}
        >
          <X size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <div className="modal__media">
          <img
            src={product.photo}
            alt={product.productName}
            width={220}
            height={220}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.endsWith('/assets/product-iphone.png')) {
                img.src = '/assets/product-iphone.png';
              }
            }}
          />
        </div>

        <div className="modal__info">
          <h2 id={titleId} className="modal__name">
            {product.descriptionShort || product.productName}
          </h2>
          <p className="modal__price">{formatPrice(product.price)}</p>
          <p className="modal__desc">
            Many desktop publishing packages and web page editors now many desktop publishing
            <br />
            <a href="#vitrine" onClick={onClose}>
              Veja mais detalhes do produto &gt;
            </a>
          </p>

          <div className="modal__buy-row">
            <div className="modal__qty" role="group" aria-label="Quantidade">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span aria-live="polite" aria-label={`Quantidade ${quantity}`}>
                {paddedQuantity}
              </span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button type="button" className="modal__cta">
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
