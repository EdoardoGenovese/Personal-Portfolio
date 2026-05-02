export type Locale = 'en' | 'it'

export type Translations = {
  hero: {
    role: string
    stack: string
    cta_work: string
    cta_contact: string
    scroll: string
  }
  nav: {
    work: string
    about: string
    contact: string
  }
  about: {
    title: string
    bio1: string
    bio2: string
    stat_years: string
    stat_companies: string
    stat_stack: string
    cv_choose: string
  }
  projects: {
    type: string
    live_demo: string
    jiraffic_desc: string
    jiraffic_features: string[]
  }
  contact: {
    title: string
    subtitle: string
    field_name: string
    field_email: string
    field_message: string
    send: string
    sending: string
    sent_title: string
    sent_subtitle: string
  }
}

export const translations: Record<Locale, Translations> = {
  en: {
    hero: {
      role: 'Frontend Engineer',
      stack: 'React · TypeScript · Next.js',
      cta_work: 'View Work',
      cta_contact: 'Get in Touch',
      scroll: 'Scroll',
    },
    nav: {
        about: 'About',
      work: 'Work',
      contact: 'Contact',
    },
    about: {
      title: 'Building interfaces that matter.',
      bio1: 'Frontend Engineer with 3+ years of experience in enterprise web apps and international e-commerce platforms. Specialized in React, TypeScript and scalable architectures.',
      bio2: 'Used to working in distributed Agile teams and managing complex frontend projects autonomously — from architecture decisions to direct client communication.',
      stat_years: 'Years exp',
      stat_companies: 'Companies',
      stat_stack: 'Technologies',
      cv_choose: 'Choose your language',
    },
    projects: {
  type: 'Full Stack App',
  live_demo: 'Live Demo',
  jiraffic_desc: 'A fast, minimal Kanban board with AI-powered priority suggestions. Built for developers who\'d rather ship than manage tickets.',
  jiraffic_features: [
    'Drag & drop across columns',
    'AI priority suggestions',
    'Real-time activity log',
    'Smart task filtering',
    'Multi-board support',
    'Google OAuth',
  ],
},
contact: {
  title: "Let's work\ntogether.",
  subtitle: "Open to new opportunities. If you have an interesting project or role, I'd love to hear about it.",
  field_name: 'Name',
  field_email: 'Email',
  field_message: 'Message',
  send: 'Send Message →',
  sending: 'Sending...',
  sent_title: 'Message sent!',
  sent_subtitle: "I'll get back to you as soon as possible.",
},
  },
  it: {
    hero: {
      role: 'Frontend Engineer',
      stack: 'React · TypeScript · Next.js',
      cta_work: 'Vedi i Progetti',
      cta_contact: 'Contattami',
      scroll: 'Scorri',
    },
    nav: {
        about: 'Chi Sono',
      work: 'Lavori',
      contact: 'Contatti',
    },
    about: {
      title: 'Costruisco interfacce che contano.',
      bio1: 'Frontend Engineer con oltre 3 anni di esperienza nello sviluppo di applicazioni web enterprise e piattaforme e-commerce internazionali. Specializzato in React, TypeScript e architetture scalabili.',
      bio2: 'Abituato a lavorare in team Agile distribuiti e a gestire in autonomia progetti frontend complessi — dalle decisioni architetturali al confronto diretto con il cliente.',
      stat_years: 'Anni exp',
      stat_companies: 'Aziende',
      stat_stack: 'Tecnologie',
      cv_choose: 'Scegli la lingua',
    },
    projects: {
  type: 'App Full Stack',
  live_demo: 'Demo Live',
  jiraffic_desc: 'Una Kanban board veloce e minimale con suggerimenti di priorità basati su AI. Costruita per developer che preferiscono spedire piuttosto che gestire ticket.',
  jiraffic_features: [
    'Drag & drop tra colonne',
    'Suggerimenti AI per le priorità',
    'Activity log in tempo reale',
    'Filtro task intelligente',
    'Supporto multi-board',
    'Google OAuth',
  ],
},
contact: {
  title: "Lavoriamo\ninsieme.",
  subtitle: "Aperto a nuove opportunità. Se hai un progetto interessante o una posizione aperta, mi farebbe piacere parlarne.",
  field_name: 'Nome',
  field_email: 'Email',
  field_message: 'Messaggio',
  send: 'Invia Messaggio →',
  sending: 'Invio in corso...',
  sent_title: 'Messaggio inviato!',
  sent_subtitle: 'Ti risponderò il prima possibile.',
},
  },
}