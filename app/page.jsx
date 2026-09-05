'use client'

import { useState } from 'react'
import { ArrowUpRight, ChevronDown, Download, Mail, Menu, X } from 'lucide-react'

const headshot = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3169-gPTd6MPbhwXLKDIJoXrRWeQnZIvPnB.jpg'
const links = { github: 'https://github.com/atharv51', linkedin: 'https://www.linkedin.com/in/atharv-singh-3902bb261', resume: '/Atharv Singh Solanki - Resume.pdf' }

const skillGroups = [
  { title: 'Languages', items: [['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['Python', 'python'], ['Java', 'java'], ['C++', 'cplusplus']] },
  { title: 'Frontend', items: [['React', 'react'], ['Next.js', 'nextjs'], ['Tailwind CSS', 'tailwindcss'], ['Framer Motion', 'framer']] },
  { title: 'Backend & Data', items: [['Node.js', 'nodejs'], ['Express', 'express'], ['REST APIs', 'api'], ['MongoDB', 'mongodb'], ['PostgreSQL', 'postgresql']] },
  { title: 'Tools & Cloud', items: [['Git', 'git'], ['GitHub', 'github'], ['Docker', 'docker'], ['Vercel', 'vercel'], ['Postman', 'postman']] },
]
const brandIcon = (slug) => `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/default.svg`
const projects = [{ title: 'Resumind', eyebrow: 'AI career companion', description: 'An intelligent resume analysis platform that turns a static CV into actionable career direction.', bullets: ['AI-powered resume feedback and scoring', 'Clear, responsive dashboard experience', 'Built for practical, confident job searching'], stack: ['Next.js', 'TypeScript', 'AI SDK'], href: '#' }]

function SectionHeading({ eyebrow, title, intro }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p>{intro}</p>}</div>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState('idle')
  async function submit(event) {
    event.preventDefault(); setStatus('loading')
    const form = event.currentTarget; const data = Object.fromEntries(new FormData(form))
    try { const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); if (!response.ok) throw new Error('Unable to send'); form.reset(); setStatus('success') } catch { setStatus('error') }
  }
  return <main>
    <div className="scroll-progress" />
    <nav className="nav"><a className="brand" href="#top" aria-label="Atharv Singh Solanki home">A<span>.</span></a><div className={`nav-links ${menuOpen ? 'open' : ''}`}><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></div><a className="nav-cta" href={links.resume}>Resume <Download size={15} /></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button></nav>

    <section className="hero section-wrap" id="top"><div className="hero-copy reveal"><p className="eyebrow">Software Engineer / Builder</p><h1>Building thoughtful<br /><em>digital experiences.</em></h1><p className="hero-text">I am Atharv Singh Solanki, a software engineer focused on designing reliable systems and delivering clear, high-quality digital products.</p><div className="hero-actions"><a className="button button-primary" href="#projects">See my work <ArrowUpRight size={17} /></a><a className="text-link" href="#contact">Let&apos;s connect <span>↗</span></a></div></div><div className="hero-visual reveal"><div className="portrait-frame"><img src={headshot} alt="Atharv Singh Solanki in a navy blazer" /></div><div className="availability"><span /> Available for opportunities</div></div><a className="scroll-cue" href="#about">Scroll to explore <ChevronDown size={16} /></a></section>

    <section className="section-wrap about" id="about"><SectionHeading eyebrow="01 / About me" title="Curious by nature. Precise by craft." /><div className="about-grid"><div className="about-copy"><p className="large-copy">I focus on the details that make software dependable and intuitive, from considered interfaces to well-structured APIs.</p><p>My work combines engineering discipline with a strong understanding of user needs. I value clear communication, maintainable architecture, and delivering measurable product outcomes.</p><div className="socials"><a href={links.github} aria-label="GitHub"><img src={brandIcon('github')} alt="" /></a><a href={links.linkedin} aria-label="LinkedIn"><img src={brandIcon('linkedin')} alt="" /></a><a href="mailto:atharv@example.com" aria-label="Email"><Mail size={18} /></a></div></div><div className="facts"><div><span>Based in</span><strong>India · Open to remote</strong></div><div><span>Focus</span><strong>Full-stack product engineering</strong></div><div><span>Currently</span><strong>Building, learning, shipping</strong></div></div></div></section>

    <section className="section-wrap" id="experience"><SectionHeading eyebrow="02 / Experience" title="A path of continuous growth." /><div className="timeline"><article className="timeline-item"><div className="timeline-date">2024 — Present</div><div><h3>Software Engineer <span>·</span> Independent</h3><p>Building full-stack web products with an emphasis on clean architecture, accessible UI, and fast iteration.</p><div className="tags"><span>React</span><span>Next.js</span><span>TypeScript</span></div></div></article><article className="timeline-item"><div className="timeline-date">2023 — 2024</div><div><h3>Software Engineering Intern <span>·</span> Product Team</h3><p>Collaborated across design and engineering to deliver user-facing features from first sketch to production.</p><div className="tags"><span>JavaScript</span><span>Node.js</span><span>MongoDB</span></div></div></article></div></section>

    <section className="section-wrap skills-section" id="skills"><SectionHeading eyebrow="03 / Toolkit" title="The tools I reach for." /><div className="skills-grid">{skillGroups.map(group => <div className="skill-group" key={group.title}><h3>{group.title}</h3><div>{group.items.map(([item, slug]) => <span className="skill-pill" key={item}><img src={brandIcon(slug)} alt="" />{item}</span>)}</div></div>)}</div></section>

    <section className="section-wrap" id="projects"><SectionHeading eyebrow="04 / Selected work" title="Made to be useful." intro="A small selection of projects where thoughtful engineering meets a clear purpose." /><div className="project-card"><div className="project-index">01</div><div className="project-content"><p className="eyebrow">Featured project</p><h3>{projects[0].title}</h3><p>{projects[0].description}</p><ul>{projects[0].bullets.map(b => <li key={b}>{b}</li>)}</ul><div className="project-footer"><div className="tags">{projects[0].stack.map(s => <span key={s}>{s}</span>)}</div><a className="text-link" href={projects[0].href}>View case study <ArrowUpRight size={16} /></a></div></div><div className="project-art"><div className="mini-window"><div className="window-top"><span /><span /><span /></div><div className="chart-line"><i /><i /><i /><i /><i /></div><div className="mini-row"><b /><b /><b /></div></div></div></div></section>

    <section className="section-wrap split-section"><div><SectionHeading eyebrow="05 / Education" title="Grounded in fundamentals." /><div className="education"><p>Computer Science & Engineering</p><strong>Bachelor&apos;s Degree</strong><span>2021 — 2025</span></div></div><div><SectionHeading eyebrow="06 / Beyond code" title="Always in motion." /><p className="large-copy">I believe the best engineers stay curious outside their editor too.</p><div className="journey-list"><div>01 <span>Learning in public</span></div><div>02 <span>Open-source curiosity</span></div><div>03 <span>Building with intention</span></div></div></div></section>

    <section className="contact section-wrap" id="contact"><div><SectionHeading eyebrow="07 / Contact" title="Have something in mind?" intro="Whether you have a project, an opportunity, or just want to say hello — my inbox is open." /><a className="email-link" href="mailto:atharv@example.com">atharv@example.com <ArrowUpRight size={18} /></a></div><form onSubmit={submit} className="contact-form"><input name="website" tabIndex={-1} autoComplete="off" className="honeypot" /><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Message<textarea name="message" required minLength={10} placeholder="Tell me a little about what you&apos;re working on..." rows={5} /></label><button className="button button-primary" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Send message'} <ArrowUpRight size={17} /></button>{status === 'success' && <p className="form-status success">Thanks — your message is on its way.</p>}{status === 'error' && <p className="form-status error">Something went wrong. Please try again or email me directly.</p>}</form></section>
    <footer className="footer section-wrap"><span>© 2025 Atharv Singh Solanki</span><span>Designed & built with intention.</span><a href="#top">Back to top ↑</a></footer>
  </main>
}
