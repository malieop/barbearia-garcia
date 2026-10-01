import { useState, useEffect } from "react";

const LOGO_URL =
  "https://res.cloudinary.com/timatal-ehf/image/upload/f_auto,c_limit,w_640,q_auto/profileImages/kfpr39cswivabnkxby8w";

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Equipa", href: "#equipa" },
  { label: "Localização", href: "#localizacao" },
];

const TEAM = [
  { name: "Ary Garcia", role: "Fundador & Barbeiro" },
  { name: "Jonatas", role: "Barbeiro" },
  { name: "Miguel", role: "Barbeiro" },
  { name: "Agustina", role: "Tatuadora" },
];

const SERVICES_PREVIEW = [
  { name: "Corte Clássico", desc: "Máquina e tesoura", price: "13 €" },
  { name: "Corte Degradé", desc: "45 minutos de precisão", price: "15 €" },
  { name: "Barba a Vapor", desc: "Tratamento completo", price: "10 €" },
  { name: "Tatuagem", desc: "Arte personalizada", price: "—" },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black: #0a0a0a;
          --dark: #141414;
          --mid: #2a2a2a;
          --border: #2e2e2e;
          --muted: #6b6b6b;
          --light: #c8c8c8;
          --white: #f5f5f3;
          --accent: #b8975a;
          --ff-serif: 'Playfair Display', Georgia, serif;
          --ff-sans: 'Lato', system-ui, sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--black);
          color: var(--white);
          font-family: var(--ff-sans);
          font-weight: 400;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 68px;
          transition: background 0.3s, border-bottom 0.3s;
          background: ${scrolled ? "rgba(10,10,10,0.95)" : "transparent"};
          border-bottom: ${scrolled ? "1px solid var(--border)" : "1px solid transparent"};
          backdrop-filter: ${scrolled ? "blur(8px)" : "none"};
        }

        .nav-logo {
          height: 44px;
          width: auto;
          display: block;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          font-family: var(--ff-sans);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--light);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--accent); }

        .nav-cta {
          font-family: var(--ff-sans);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--black);
          background: var(--accent);
          border: none;
          padding: 0.55rem 1.4rem;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.85; }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--white);
          transition: transform 0.2s;
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 68px; left: 0; right: 0;
          background: var(--dark);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem 2rem 2rem;
          z-index: 99;
          flex-direction: column;
          gap: 1.25rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--light);
          text-decoration: none;
        }
        .mobile-menu .nav-cta { align-self: flex-start; margin-top: 0.5rem; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 2rem 5rem;
          position: relative;
          overflow: hidden;
          background: var(--black);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 70% at 70% 40%, rgba(184,151,90,0.07) 0%, transparent 65%),
            linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 80%, var(--black) 100%);
          pointer-events: none;
        }

        /* Decorative vertical rule */
        .hero-rule {
          position: absolute;
          left: 2rem;
          top: 100px;
          bottom: 5rem;
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--accent) 30%, var(--accent) 70%, transparent);
          opacity: 0.35;
        }

        .hero-content {
          position: relative;
          max-width: 720px;
          padding-left: 3rem;
        }

        .hero-eyebrow {
          font-family: var(--ff-sans);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.25rem;
        }

        .hero-title {
          font-family: var(--ff-serif);
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 700;
          line-height: 1.05;
          color: var(--white);
          margin-bottom: 1.5rem;
        }

        .hero-title em {
          font-style: italic;
          color: var(--accent);
        }

        .hero-sub {
          font-size: 1rem;
          font-weight: 300;
          color: var(--light);
          max-width: 42ch;
          margin-bottom: 2.5rem;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .btn-primary {
          font-family: var(--ff-sans);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--black);
          background: var(--accent);
          border: none;
          padding: 0.85rem 2rem;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s;
          display: inline-block;
        }
        .btn-primary:hover { opacity: 0.85; }

        .btn-ghost {
          font-family: var(--ff-sans);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--light);
          background: transparent;
          border: 1px solid var(--border);
          padding: 0.85rem 2rem;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          display: inline-block;
        }
        .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

        .hero-rating {
          position: absolute;
          right: 2rem;
          bottom: 5rem;
          text-align: right;
        }

        .rating-number {
          font-family: var(--ff-serif);
          font-size: 3.5rem;
          font-weight: 600;
          color: var(--accent);
          line-height: 1;
        }

        .rating-stars {
          color: var(--accent);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          margin: 0.25rem 0;
        }

        .rating-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── SECTION BASE ── */
        section {
          padding: 6rem 2rem;
        }

        .section-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-header {
          margin-bottom: 3.5rem;
        }

        .section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          display: block;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-family: var(--ff-serif);
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 600;
          color: var(--white);
          line-height: 1.2;
        }

        /* ── SERVICES ── */
        #servicos { background: var(--dark); }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
        }

        .service-card {
          background: var(--dark);
          padding: 2.25rem 2rem;
          transition: background 0.2s;
        }
        .service-card:hover { background: var(--mid); }

        .service-name {
          font-family: var(--ff-serif);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 0.4rem;
        }

        .service-desc {
          font-size: 0.82rem;
          color: var(--muted);
          margin-bottom: 1.25rem;
          font-weight: 300;
        }

        .service-price {
          font-family: var(--ff-serif);
          font-size: 1.4rem;
          font-weight: 400;
          color: var(--accent);
        }

        .services-link {
          display: inline-block;
          margin-top: 2.5rem;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid var(--accent);
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .services-link:hover { opacity: 0.7; }

        /* ── TEAM ── */
        #equipa { background: var(--black); }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem;
        }

        .team-card {
          border-top: 1px solid var(--border);
          padding-top: 1.5rem;
        }

        .team-name {
          font-family: var(--ff-serif);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 0.3rem;
        }

        .team-role {
          font-size: 0.78rem;
          font-weight: 400;
          color: var(--muted);
          letter-spacing: 0.04em;
        }

        /* ── LOCATION ── */
        #localizacao { background: var(--dark); }

        .location-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .location-details {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .location-item-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          display: block;
          margin-bottom: 0.4rem;
        }

        .location-item-value {
          font-size: 0.95rem;
          color: var(--light);
          font-weight: 300;
          line-height: 1.6;
        }

        .map-placeholder {
          aspect-ratio: 4/3;
          background: var(--mid);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── FOOTER ── */
        footer {
          background: var(--black);
          border-top: 1px solid var(--border);
          padding: 2.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-logo { height: 36px; width: auto; }

        .footer-copy {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 300;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }

          .hero-rule { display: none; }
          .hero-content { padding-left: 0; }
          .hero-rating { display: none; }

          .location-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          section { padding: 4rem 1.25rem; }
          nav { padding: 0 1.25rem; }
          .hero { padding: 0 1.25rem 4rem; }
          footer { padding: 2rem 1.25rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ background: scrolled ? "rgba(10,10,10,0.95)" : "transparent", borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent", backdropFilter: scrolled ? "blur(8px)" : "none" }}>
        <img src={LOGO_URL} alt="Barbearia Garcia & Tatuagem" className="nav-logo" />

        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="https://noona.pt/barbeariagarcia/book" target="_blank" rel="noopener noreferrer" className="nav-cta">
          Marcar
        </a>

        <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="https://noona.pt/barbeariagarcia/book" target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={() => setMenuOpen(false)}>
          Marcar
        </a>
      </div>

      {/* HERO */}
      <section className="hero" style={{ padding: undefined }}>
        <div className="hero-bg" />
        <div className="hero-rule" />

        <div className="hero-content">
          <p className="hero-eyebrow">Moreira, Portugal</p>
          <h1 className="hero-title">
            Barbearia<br />
            Garcia &amp;<br />
            <em>Tatuagem</em>
          </h1>
          <p className="hero-sub">
            Cortes de precisão, barba a vapor e tatuagem personalizada — num só espaço, em Moreira.
          </p>
          <div className="hero-actions">
            <a href="https://noona.pt/barbeariagarcia/book" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Marcar visita
            </a>
            <a href="#servicos" className="btn-ghost">
              Ver serviços
            </a>
          </div>
        </div>

        <div className="hero-rating">
          <div className="rating-number">4.9</div>
          <div className="rating-stars">★★★★★</div>
          <div className="rating-label">Avaliação dos clientes</div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="servicos">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-label">O que fazemos</span>
            <h2 className="section-title">Serviços</h2>
          </div>

          <div className="services-grid">
            {SERVICES_PREVIEW.map((s) => (
              <div className="service-card" key={s.name}>
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-price">{s.price}</div>
              </div>
            ))}
          </div>

          <a href="/servicos" className="services-link">
            Ver todos os preços
          </a>
        </div>
      </section>

      {/* TEAM */}
      <section id="equipa">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-label">A nossa equipa</span>
            <h2 className="section-title">Quem vos vai receber</h2>
          </div>

          <div className="team-grid">
            {TEAM.map((m) => (
              <div className="team-card" key={m.name}>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="localizacao">
        <div className="section-inner">
          <div className="location-inner">
            <div>
              <div className="section-header">
                <span className="section-label">Onde estamos</span>
                <h2 className="section-title">Encontra‑nos em Moreira</h2>
              </div>

              <div className="location-details">
                <div>
                  <span className="location-item-label">Morada</span>
                  <p className="location-item-value">
                    Alameda Padre Alcino Azevedo Barbosa 6<br />
                    4470‑580 Moreira
                  </p>
                </div>
                <div>
                  <span className="location-item-label">Marcações</span>
                  <p className="location-item-value">noona.pt/barbeariagarcia</p>
                </div>
              </div>

              <a
                href="https://noona.pt/barbeariagarcia/book"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ marginTop: "2.5rem", display: "inline-block" }}
              >
                Marcar agora
              </a>
            </div>

            <div className="map-placeholder">Mapa</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <img src={LOGO_URL} alt="Barbearia Garcia & Tatuagem" className="footer-logo" />
        <p className="footer-copy">© {new Date().getFullYear()} Barbearia Garcia & Tatuagem · Moreira, Portugal</p>
      </footer>
    </>
  );
}
