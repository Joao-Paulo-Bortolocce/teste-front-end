import './Footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div>
          <img src="/assets/logo.png" alt="Econverse" width={120} height={28} loading="lazy" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <nav aria-label="Institucional">
          <strong>Institucional</strong>
          <a href="#">Sobre Nós</a>
          <a href="#">Movimento</a>
          <a href="#">Trabalhe conosco</a>
        </nav>
        <nav aria-label="Ajuda">
          <strong>Ajuda</strong>
          <a href="#">Suporte</a>
          <a href="#">Fale Conosco</a>
          <a href="#">Perguntas Frequentes</a>
        </nav>
        <nav aria-label="Termos">
          <strong>Termos</strong>
          <a href="#">Termos e Condições</a>
          <a href="#">Política de Privacidade</a>
          <a href="#">Troca e Devolução</a>
        </nav>
      </div>
      <p className="footer__bottom">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </footer>
  );
}
