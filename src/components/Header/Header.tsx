import { Heart, LayoutGrid, Search, ShoppingCart } from 'lucide-react';
import './Header.scss';

const NAV = ['TODAS CATEGORIAS', 'SUPERMERCADO', 'LIVROS', 'MODA', 'LANÇAMENTOS', 'OFERTAS DO DIA', 'ASSINATURA'];

export function Header() {
  return (
    <header className="header">
      <div className="header__main">
        <a className="header__logo" href="#" aria-label="Econverse - página inicial">
          <img src="/assets/logo.png" alt="Econverse" width={120} height={28} />
        </a>
        <form className="header__search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label className="sr-only" htmlFor="search">Buscar produtos</label>
          <input id="search" name="search" type="search" placeholder="O que você está buscando?" />
          <button type="submit" aria-label="Buscar">
            <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </form>
        <nav className="header__icons" aria-label="Conta e carrinho">
          <a href="#" aria-label="Minha conta">
            <LayoutGrid size={22} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <a href="#" aria-label="Favoritos">
            <Heart size={22} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <a href="#" aria-label="Carrinho">
            <ShoppingCart size={22} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </nav>
      </div>
      <nav className="header__nav" aria-label="Categorias">
        <ul>
          {NAV.map((item) => (
            <li key={item}>
              <a href="#vitrine">{item}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
