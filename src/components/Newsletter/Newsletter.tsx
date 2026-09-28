import './Newsletter.scss';

export function Newsletter() {
  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__container">
        <div>
          <h2 id="newsletter-title">Inscreva-se na nossa newsletter</h2>
          <p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" placeholder="Digite seu nome" aria-label="Digite seu nome" autoComplete="name" />
          <input type="email" name="email" placeholder="Digite seu e-mail" aria-label="Digite seu e-mail" autoComplete="email" />
          <button type="submit">INSCREVER</button>
          <label className="newsletter__terms">
            <input type="checkbox" name="terms" /> Aceito os termos e condições
          </label>
        </form>
      </div>
    </section>
  );
}
