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
    bio1: string
    bio2: string
    bio3: string
    bio4: string
    stat_years: string
    stat_companies: string
    stat_stack: string
    cv_choose: string
    cv_download: string
  }
  projects: {
    type: string
    live_demo: string
    jiraffic_desc: string
    jiraffic_features: string[]
    yapyap_desc: string
    yapyap_features: string[]
    portfolio_desc: string
    portfolio_features: string[]
    wip_desc: string
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
      role: 'Frontend Developer',
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
      bio1: 'Frontend Engineer with 3+ years of experience developing enterprise web applications and international e-commerce platforms, specializing in React, TypeScript, and scalable architectures.',
      bio2: "I've always been curious about how things work — I started by tinkering with computers, trying to understand what was happening under the hood. That same curiosity still drives how I approach development today.",
      bio3: "I enjoy solving problems, improving existing code, and working on products that evolve over time. Technology is constantly changing, and that's exactly what keeps me motivated.",
      bio4: "I'm comfortable working in distributed Agile teams and handling complex frontend projects end-to-end, from architectural decisions to direct collaboration with clients.",
      stat_years: 'Years exp',
      stat_companies: 'Companies',
      stat_stack: 'Technologies',
      cv_choose: 'Choose your language',
      cv_download: 'Download CV',
    },
    projects: {
      type: 'Full Stack App',
      live_demo: 'Live Demo',
      jiraffic_desc:
        "A fast, minimal Kanban board with AI-powered priority suggestions. Built for developers who'd rather ship than manage tickets.",
      jiraffic_features: [
        'Drag & drop across columns',
        'AI priority suggestions',
        'Real-time activity log',
        'Smart task filtering',
        'Multi-board support',
        'Google OAuth',
      ],
      yapyap_desc:
        'Real-time chat app with public and private rooms, file uploads, typing indicators and live presence. Built with a Node.js backend and Socket.io.',
      yapyap_features: [
        'Real-time messaging',
        'Public & private rooms',
        'File & image uploads',
        'Typing indicators',
        'Live user presence',
        'JWT authentication',
      ],
      portfolio_desc:
        'Personal portfolio with 3D particle field, full-page scroll animations and bilingual support.',
      portfolio_features: [
        '3D interactive particle field',
        'Full-page scroll with 3D transitions',
        'Custom cursor with spring physics',
        'Bilingual IT/EN with 3D globe toggle',
        'Separate mobile version',
        'CV download in two languages',
      ],
      wip_desc: 'Something new is being built. Check back soon.',
    },
    contact: {
      title: "Let's work\ntogether.",
      subtitle:
        "Open to new opportunities. If you have an interesting project or role, I'd love to hear about it.",
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
      role: 'Frontend Developer',
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
      bio1: 'Frontend Engineer con oltre 3 anni di esperienza nello sviluppo di applicazioni web enterprise e piattaforme e-commerce internazionali, specializzato in React, TypeScript e architetture scalabili.',
      bio2: 'La mia passione per la tecnologia nasce da lontano: ho sempre passato tempo a smanettare con i computer per capire come funzionano davvero le cose. Oggi questo approccio è diventato il mio modo di lavorare.',
      bio3: "Mi diverte quello che faccio, soprattutto quando c'è da risolvere problemi, migliorare codice esistente o affrontare nuove sfide. È un ambito in continua evoluzione, ed è proprio questo che lo rende stimolante.",
      bio4: 'Nel lavoro sono abituato a muovermi tra autonomia e collaborazione, partecipando attivamente alle decisioni tecniche e confrontandomi direttamente con team e clienti.',
      stat_years: 'Anni exp',
      stat_companies: 'Aziende',
      stat_stack: 'Tecnologie',
      cv_choose: 'Scegli la lingua',
      cv_download: 'Scarica il CV',
    },
    projects: {
      type: 'App Full Stack',
      live_demo: 'Demo Live',
      jiraffic_desc:
        'Una Kanban board veloce e minimale con suggerimenti di priorità basati su AI. Costruita per developer che preferiscono spedire piuttosto che gestire ticket.',
      jiraffic_features: [
        'Drag & drop tra colonne',
        'Suggerimenti AI per le priorità',
        'Activity log in tempo reale',
        'Filtro task intelligente',
        'Supporto multi-board',
        'Google OAuth',
      ],
      yapyap_desc:
        'App di chat real-time con stanze pubbliche e private, upload di file, indicatore di digitazione e presenza live. Backend Node.js con Socket.io.',
      yapyap_features: [
        'Messaggi in tempo reale',
        'Stanze pubbliche e private',
        'Upload file e immagini',
        'Indicatore di digitazione',
        'Presenza utenti live',
        'Autenticazione JWT',
      ],
      portfolio_desc:
        'Portfolio personale con campo di particelle 3D, animazioni full-page scroll e supporto bilingue.',
      portfolio_features: [
        'Campo di particelle 3D interattivo',
        'Full-page scroll con transizioni 3D',
        'Cursore custom con fisica spring',
        'Bilingue IT/EN con globo 3D',
        'Versione mobile separata',
        'CV scaricabile in due lingue',
      ],
      wip_desc: 'Qualcosa di nuovo è in costruzione. Torna presto.',
    },
    contact: {
      title: 'Lavoriamo\ninsieme!',
      subtitle:
        'Aperto a nuove opportunità. Se hai un progetto interessante o una posizione aperta, mi farebbe piacere parlarne.',
      field_name: 'Nome',
      field_email: 'Email',
      field_message: 'Messaggio',
      send: 'Invia Messaggio →',
      sending: 'Invio in corso...',
      sent_title: 'Messaggio inviato!',
      sent_subtitle: 'Ti risponderò il prima possibile!',
    },
  },
}
