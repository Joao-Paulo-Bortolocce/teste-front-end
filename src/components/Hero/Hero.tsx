import './Hero.scss';

export function Hero() {
  return (
    <section className="hero" aria-label="Promoções em destaque">
      <div className="hero__content">
        <h1>
          Venha conhecer nossas
          <br />
          promoções
        </h1>
        <p>
          <strong>50% Off</strong> nos produtos
        </p>
        <a className="hero__cta" href="#vitrine">
          Ver produto
        </a>
      </div>
      <div className="hero__spacer" aria-hidden="true" />
    </section>
  );
}
