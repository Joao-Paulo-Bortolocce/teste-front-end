import { CreditCard, ShieldCheck, Truck } from 'lucide-react';
import './TopBar.scss';

export function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__container">
        <span>
          <ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true" /> Compra 100% segura
        </span>
        <span>
          <Truck size={14} strokeWidth={1.75} aria-hidden="true" /> Frete grátis acima de R$ 200
        </span>
        <span>
          <CreditCard size={14} strokeWidth={1.75} aria-hidden="true" /> Parcele suas compras
        </span>
      </div>
    </div>
  );
}
