import './Partners.scss';

export function Partners() {
  return (
    <section className="partners" aria-label="Parceiros">
      {[1, 2].map((item) => (
        <article key={item} className="partners__card">
          <h3>Parceiros</h3>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <a href="#vitrine">CONFIRA</a>
        </article>
      ))}
    </section>
  );
}
