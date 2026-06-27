"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";


const WHATSAPP_NUMBER = "5491100000000";
const WHATSAPP_MESSAGE = "Hola Sr. Ríos, me gustaría consultar sobre sus servicios legales.";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const, } }),
};

const services = [
  {
    id: "1",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scale-icon lucide-scale"><path d="M12 3v18"/><path d="m19 8 3 8a5 5 0 0 1-6 0zV7"/><path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"/><path d="m5 8 3 8a5 5 0 0 1-6 0zV7"/><path d="M7 21h10"/></svg>),
    title: "Derecho Civil",
    description: "Asesoramiento integral en contratos, obligaciones, daños y perjuicios. Representación en litigios civiles con enfoque estratégico y resolución eficiente.",
  },
  {
    id:"2",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>),
    title: "Derecho Inmobiliario",
    description: "Compraventa, locaciones, propiedad horizontal y litigios sobre inmuebles. Seguridad jurídica en cada operación del mercado inmobiliario.",
  },
  {
    id:"3",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>),
    title: "Derecho de Familia",
    description: "Divorcios, alimentos, guarda y régimen de visitas. Mediación familiar y procesos sucesorios. Acompañamiento profesional en momentos sensibles.",
  },
  {
    id:"4",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text-icon lucide-file-text"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>),
    title: "Contratos y Negociaciones",
    description: "Redacción, revisión y negociación de contratos civiles y comerciales. Cláusulas precisas que anticipan conflictos y protegen sus intereses.",
  },
  {
    id:"5",
    icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-icon lucide-shield"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>),
    title: "Derecho Laboral",
    description: "Defensa de empleadores y empleados ante conflictos laborales, despidos y accidentes de trabajo. Cumplimiento normativo y gestión preventiva.",
  },
];

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#FAF7F2] backdrop-blur-sm shadow-sm border-b border-[#1C2B4A]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); handleLink("#inicio"); }}
          className="font-semibold text-[#1C2B4A] tracking-wide hover:text-[#B8965A] transition-colors duration-300"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}
        >
          Carlos Alberto Ríos ⚖
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleLink(l.href)}
                className="text-sm tracking-widest uppercase font-light text-[#1C2B4A]/70 hover:text-[#B8965A] transition-colors duration-300 cursor-pointer relative group"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#B8965A] transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-[#1C2B4A] p-1" onClick={() => setOpen(!open)}>
          {open ? <div id="X" /> : <div id="Menu" />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#FAF7F2] border-b border-[#1C2B4A] ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleLink(l.href)}
                className="text-sm tracking-widest uppercase font-light text-[#1C2B4A]/70 hover:text-[#B8965A] transition-colors duration-300 w-full text-left cursor-pointer"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1C2B4A]">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&h=1200&fit=crop&auto=format"
          alt="Biblioteca jurídica"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2B4A]/90 via-[#1C2B4A]/70 to-[#1C2B4A]/30" />
      </div>

      <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 opacity-40">
        <div className="w-px h-24 bg-[#B8965A]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#B8965A]" />
        <div className="w-px h-24 bg-[#B8965A]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="text-[#B8965A] text-xs tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Abogado — Buenos Aires, Argentina
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.25}
            variants={fadeUp}
            className="text-[#F4EFE6] leading-[1.1] mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 400,
            }}
          >
            Carlos Alberto
            <br />
            <em className="italic text-[#B8965A]">Ríos</em>
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.35}
            variants={fadeUp}
            className="w-16 h-px bg-[#B8965A] mb-8"
          />

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.45}
            variants={fadeUp}
            className="text-[#F4EFE6]/70 text-lg font-light leading-relaxed max-w-md mb-10"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Experiencia defendiendo los derechos de personas y empresas. Claridad jurídica, estrategia y compromiso en cada caso.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.55}
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 bg-[#B8965A] text-[#B8965A]-[#1C2B4A] text-sm tracking-widest uppercase font-light hover:bg-[#B8965A]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Consulta gratuita
            </button>
            <button
              onClick={() => document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 border border-[#F4EFE6]/30 text-[#F4EFE6]/80 text-sm tracking-widest uppercase font-light hover:border-[#B8965A] hover:text-[#B8965A] transition-all duration-300"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Ver servicios
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <div id="ChevronDown" />
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView();
  return (
    <section id="sobre-mi" className="py-28 bg-[#F4EFE6]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
              <img
                src="https://i.postimg.cc/Nj32kg0C/Carlos-Rios.png"
                alt="Sr. Carlos Alberto Ríos, Abogado"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#B8965A]/30 pointer-events-none" />
            </div>
            {/* <div className="absolute -bottom-6 right-0 lg:-right-8 bg-card shadow-xl p-5 border border-[#1C2B4A] max-w-[200px]">
              <p className="text-3xl font-semibold text-[#1C2B4A] leading-none mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                📁
              </p>
              <p className="text-xs tracking-widest uppercase text-[#E4DDD1]-[#1C2B4A] font-light" style={{ fontFamily: "'Lato', sans-serif" }}>
                Experiencia en el ejercicio profesional
              </p>
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pl-8"
          >
            <p className="text-[#B8965A] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
              Sobre mí
            </p>
            <h2
              className="text-[#1C2B4A] mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 400 }}
            >
              Compromiso con <em className="italic text-[#B8965A]">la justicia</em>
            </h2>
            <div className="w-12 h-px bg-[#B8965A] mb-8" />
            <div className="space-y-4 text-[#1C2B4A]/70 font-light leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>
              <p>
                Soy abogado egresado de la Universidad de Buenos Aires con especialización en Derecho Civil y Comercial. A lo largo de mi carrera he representado tanto a particulares como a empresas en causas de diversa complejidad, siempre con rigor técnico y vocación de servicio.
              </p>
              <p>
                Mi enfoque combina una preparación académica sólida con un conocimiento profundo de la realidad jurídica argentina. Creo en la comunicación clara: explico cada etapa del proceso para que usted tome decisiones informadas.
              </p>
              <p>
                Con sede en la Ciudad de Buenos Aires, atiendo presencialmente y de manera remota en toda la República Argentina.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                { num: "500+", label: "Casos resueltos" },
                { num: "98%", label: "Clientes satisfechos" },
              ].map(({ num, label }) => (
                <div key={label} className="border-l-2 border-[#B8965A] pl-4">
                  <p className="text-2xl font-semibold text-[#1C2B4A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {num}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-[#E4DDD1]-[#1C2B4A] font-light mt-0.5" style={{ fontFamily: "'Lato', sans-serif" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="servicios" className="py-28 bg-[#E8E0D0]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <p className="text-[#B8965A] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
              Áreas de práctica
            </p>
            <h2
              className="text-[#1C2B4A] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 400 }}
            >
              Servicios <em className="italic text-[#B8965A]">legales</em>
            </h2>
            <div className="w-12 h-px bg-[#B8965A] mx-auto mt-6" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-[#FAF7F2] p-8 border border-[#1C2B4A] hover:border-[#B8965A]/40 hover:shadow-lg transition-all duration-300 cursor-default"
              >
                <div className="mb-5 w-10 h-10 flex items-center justify-center border border-[#1C2B4A] group-hover:border-[#B8965A]/50 group-hover:bg-[#B8965A]/5 transition-all duration-300">
                  <div id={i} />
                  {icon}
                </div>
                <h3
                  className="text-[#1C2B4A] mb-3 text-lg font-medium group-hover:text-[#B8965A] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                >
                  {title}
                </h3>
                <p className="text-[#1C2B4A]/60 text-sm leading-relaxed font-light" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 bg-[#1C2B4A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&h=600&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <div className="text-[#B8965A] text-6xl leading-none mb-4 opacity-40" style={{ fontFamily: "'Playfair Display', serif" }}>"</div>
        <blockquote
          className="text-[#F4EFE6]/90 leading-relaxed mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 400, fontStyle: "italic" }}
        >
          Aquí va una breve declaración o una anotación a destacar en forma de banner.
        </blockquote>
        <p className="text-[#B8965A] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>
          — Carlos Alberto Ríos
        </p>
      </motion.div>
    </section>
  );
}

function Contact() {
  const { ref, inView } = useInView();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="contacto" className="py-28 bg-[#F4EFE6]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#B8965A] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
              Contacto
            </p>
            <h2
              className="text-[#1C2B4A] leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 400 }}
            >
              Hablemos de <em className="italic text-[#B8965A]">su caso</em>
            </h2>
            <div className="w-12 h-px bg-[#B8965A] mb-8" />
            <p className="text-[#1C2B4A]/70 font-light leading-relaxed mb-10 max-w-md w-full" style={{ fontFamily: "'Lato', sans-serif" }}>
              La primera consulta es gratuita y sin compromiso. Cuénteme su situación y le daré una evaluación honesta sobre las opciones disponibles.
            </p>
            <div className="space-y-4">
              {[
                { label: "Teléfono / WhatsApp", value: "+54 9 11 0000-0000" },
                { label: "Correo electrónico", value: "consultas@carlosrios.com.ar" },
                { label: "Dirección", value: "Av. Corrientes 1234, Piso 8, CABA" },
                { label: "Horario de atención", value: "Lunes a Viernes, 9:00 – 18:00 hs" },
              ].map(({ label, value }) => (
<div key={label} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
  <span
    className="text-xs tracking-widest uppercase text-[#E4DDD1]-[#1C2B4A] font-light sm:w-44 sm:shrink-0"
    style={{ fontFamily: "'Lato', sans-serif" }}
  >
    {label}
  </span>

  <span
    className="text-[#1C2B4A] font-light break-words"
    style={{ fontFamily: "'Lato', sans-serif" }}
  >
    {value}
  </span>
</div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#FAF7F2] border border-[#1C2B4A] p-10"
          >
            <p className="text-[#1C2B4A]/80 font-light leading-relaxed mb-8" style={{ fontFamily: "'Lato', sans-serif" }}>
              La vía más rápida para una respuesta es por WhatsApp. Escriba en cualquier momento y le responderé a la brevedad.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white text-sm tracking-widest uppercase font-light hover:bg-[#1ebe5a] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <WhatsAppIcon />
              Consultar por WhatsApp
            </a>
            <div className="mt-6 pt-6 border-t border-[#1C2B4A]">
              <p className="text-xs text-[#E4DDD1]-[#1C2B4A] font-light text-center" style={{ fontFamily: "'Lato', sans-serif" }}>
                También puede escribir a{" "}
                <a href="mailto:consultas@carlosrios.com.ar" className="text-[#B8965A] hover:underline break-all">
                  consultas@carlosrios.com.ar
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1C2B4A] py-10 border-t border-[#F4EFE6]/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#F4EFE6]/40 text-xs font-light" style={{ fontFamily: "'Lato', sans-serif" }}>
          © 2024 Carlos Alberto Ríos · Todos los derechos reservados
        </p>
        <p className="text-[#F4EFE6]/40 text-xs font-light" style={{ fontFamily: "'Lato', sans-serif" }}>
          Mat. Prof. CPACF T° 000 F° 000
        </p>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function WhatsAppFab() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Consultar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white px-5 py-3.5 shadow-2xl hover:bg-[#1ebe5a] hover:-translate-y-1 transition-all duration-300"
    >
      <WhatsAppIcon />
      <span className="text-sm font-light tracking-wider hidden sm:block" style={{ fontFamily: "'Lato', sans-serif" }}>
        WhatsApp
      </span>
    </a>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Quote />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
