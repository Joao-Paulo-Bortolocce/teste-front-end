import './Brands.scss';

const BRANDS = ['Marca 1', 'Marca 2', 'Marca 3', 'Marca 4', 'Marca 5'];

export function Brands() {
  return (
    <section className="brands" aria-labelledby="brands-title">
      <div className="brands__title-row">
        <h2 id="brands-title">Navegue por marcas</h2>
      </div>
      <ul>
        {BRANDS.map((brand) => (
          <li key={brand}>
            <a href="#vitrine" aria-label={brand}>
              <img
                src="/assets/econverse-logo.svg"
                alt={brand}
                loading="lazy"
                width={110}
                height={24}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
