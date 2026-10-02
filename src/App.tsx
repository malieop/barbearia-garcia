import { useState, useEffect } from 'react'
import './App.css'

interface NavLink {
  label: string
  href: string
}

interface TeamMember {
  name: string
  role: string
}

interface ServiceItem {
  id: string
  name: string
  price: string
  duration: string
  category: 'barbearia' | 'tatuagem'
}

const LOGO_URL = `${import.meta.env.BASE_URL}logo.svg`
const BOOKING_URL = 'https://noona.pt/barbeariagarcia/book'
const INSTAGRAM_URL = 'https://www.instagram.com/barbeariagarciapt/'

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const NAV_LINKS: NavLink[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Equipa', href: '#equipa' },
  { label: 'Localização', href: '#localizacao' },
]

const TEAM: TeamMember[] = [
  { name: 'Ary Garcia', role: 'Fundador & Barbeiro' },
  { name: 'Jonatas', role: 'Barbeiro' },
  { name: 'Miguel', role: 'Barbeiro' },
  { name: 'Agustina', role: 'Tatuadora' },
]

const SERVICES: ServiceItem[] = [
  {
    id: 'corte-classico',
    name: 'Corte Clássico (Máquina e Tesoura)',
    price: '13 €',
    duration: '30 min',
    category: 'barbearia',
  },
  {
    id: 'corte-degrade',
    name: 'Corte Degradé',
    price: '15 €',
    duration: '45 min',
    category: 'barbearia',
  },
  {
    id: 'barba-vapor',
    name: 'Barba a Vapor',
    price: '10 €',
    duration: '30 min',
    category: 'barbearia',
  },
  {
    id: 'corte-degrade-barba-vapor',
    name: 'Corte Degradé + Barba Vapor',
    price: '23 €',
    duration: '60 min',
    category: 'barbearia',
  },
  {
    id: 'corte-tesoura',
    name: 'Corte Clássico c/ Tesoura',
    price: '14 €',
    duration: '30 min',
    category: 'barbearia',
  },
  {
    id: 'reuniao-orcamento',
    name: 'Reunião de Orçamento',
    price: 'Grátis',
    duration: '60 min',
    category: 'tatuagem',
  },
  {
    id: 'corte-maquina',
    name: 'Corte só Máquina',
    price: '11 €',
    duration: '30 min',
    category: 'barbearia',
  },
  {
    id: 'corte-crianca',
    name: 'Corte de Criança',
    price: '12 €',
    duration: '30 min',
    category: 'barbearia',
  },
  {
    id: 'corte-crianca-degrade',
    name: 'Corte Criança Degradé',
    price: '13 €',
    duration: '45 min',
    category: 'barbearia',
  },
  {
    id: 'barba-maquina',
    name: 'Barba só Máquina',
    price: '7 €',
    duration: '30 min',
    category: 'barbearia',
  },
  {
    id: 'corte-classico-barba-vapor',
    name: 'Corte Clássico + Barba Vapor',
    price: '21 €',
    duration: '60 min',
    category: 'barbearia',
  },
  {
    id: 'corte-tesoura-barba-maquina',
    name: 'Corte a Tesoura + Barba Máquina',
    price: '20 €',
    duration: '45 min',
    category: 'barbearia',
  },
  {
    id: 'corte-degrade-barba-maquina',
    name: 'Corte Degradé + Barba Máquina',
    price: '21 €',
    duration: '60 min',
    category: 'barbearia',
  },
  {
    id: 'corte-maquina-barba-vapor',
    name: 'Corte Máquina + Barba Vapor',
    price: '19 €',
    duration: '45 min',
    category: 'barbearia',
  },
  {
    id: 'coloracao',
    name: 'Coloração',
    price: '30 €',
    duration: '30 min',
    category: 'barbearia',
  },
  {
    id: 'alisamento',
    name: 'Alisamento',
    price: '30 €',
    duration: '45 min',
    category: 'barbearia',
  },
  {
    id: 'sobrancelhas',
    name: 'Sobrancelhas',
    price: '4 €',
    duration: '15 min',
    category: 'barbearia',
  },
  {
    id: 'lavagem',
    name: 'Lavagem',
    price: '6 €',
    duration: '15 min',
    category: 'barbearia',
  },
  {
    id: 'madeixas',
    name: 'Madeixas',
    price: '30 €',
    duration: '165 min',
    category: 'barbearia',
  },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'barbearia' | 'tatuagem'>('all')
  const [isExpanded, setIsExpanded] = useState(false)
  const [previewCount, setPreviewCount] = useState(6)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const updatePreviewCount = () => {
      // Screen width >= 900px allows 3 service columns, so minimum preview is 6; otherwise 4
      setPreviewCount(window.innerWidth >= 900 ? 6 : 4)
    }
    updatePreviewCount()
    window.addEventListener('resize', updatePreviewCount)
    return () => window.removeEventListener('resize', updatePreviewCount)
  }, [])

  const filteredServices = SERVICES.filter((service) => {
    if (selectedCategory === 'all') return true
    return service.category === selectedCategory
  })

  const displayedServices = isExpanded
    ? filteredServices
    : filteredServices.slice(0, previewCount)

  return (
    <>
      {/* NAV */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#">
          <img src={LOGO_URL} alt="Barbearia Garcia & Tatuagem" className="nav-logo" />
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-instagram"
            aria-label="Instagram da Barbearia Garcia"
          >
            <InstagramIcon />
          </a>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            Marcar
          </a>
        </div>

        <button
          type="button"
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <div className="mobile-actions">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-instagram"
            onClick={() => setMenuOpen(false)}
          >
            <InstagramIcon />
            <span>Instagram</span>
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Marcar
          </a>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
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
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Marcar visita
            </a>
            <a href="#servicos" className="btn-ghost">
              Ver serviços
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicos">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-label">Tabela de Preços</span>
            <h2 className="section-title">Serviços &amp; Valores</h2>
          </div>

          <div className="services-tabs">
            <button
              type="button"
              className={`services-tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              Todos ({SERVICES.length})
            </button>
            <button
              type="button"
              className={`services-tab-btn ${selectedCategory === 'barbearia' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('barbearia')}
            >
              Barbearia ({SERVICES.filter((s) => s.category === 'barbearia').length})
            </button>
            <button
              type="button"
              className={`services-tab-btn ${selectedCategory === 'tatuagem' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('tatuagem')}
            >
              Tatuagem ({SERVICES.filter((s) => s.category === 'tatuagem').length})
            </button>
          </div>

          <div className="services-grid">
            {displayedServices.map((s) => (
              <div className="service-card" key={s.id}>
                <div className="service-card-top">
                  <div className="service-meta">
                    <span className="service-badge">
                      {s.category === 'barbearia' ? 'Barbearia' : 'Tatuagem'}
                    </span>
                    <span className="service-duration">{s.duration}</span>
                  </div>
                  <h3 className="service-name">{s.name}</h3>
                </div>

                <div className="service-card-bottom">
                  <span className="service-price">{s.price}</span>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-book-btn"
                  >
                    Marcar &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length > previewCount && (
            <div className="services-expand-container">
              <button
                type="button"
                className="services-expand-btn"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
              >
                {isExpanded ? (
                  <>
                    Mostrar menos <span className="arrow">↑</span>
                  </>
                ) : (
                  <>
                    Ver todos os serviços ({filteredServices.length}){' '}
                    <span className="arrow">↓</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* TEAM */}
      <section id="equipa">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">A nossa equipa</h2>
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
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ marginTop: '2.5rem', display: 'inline-block' }}
              >
                Marcar agora
              </a>
            </div>

            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5148.2726583471895!2d-8.651520622530173!3d41.245650171318296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2467548573e19d%3A0xb8d04676135053d9!2sBARBEARIA%20GARCIA%20%26%20TATUAGEM!5e1!3m2!1sen!2spt!4v1790959223460!5m2!1sen!2spt"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Localização Barbearia Garcia &amp; Tatuagem"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <img src={LOGO_URL} alt="Barbearia Garcia & Tatuagem" className="footer-logo" />

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-instagram"
          aria-label="Instagram da Barbearia Garcia"
        >
          <InstagramIcon />
          <span>@barbeariagarciapt</span>
        </a>

        <p className="footer-copy">
          © {new Date().getFullYear()} Barbearia Garcia &amp; Tatuagem · Moreira, Portugal
        </p>
      </footer>
    </>
  )
}
