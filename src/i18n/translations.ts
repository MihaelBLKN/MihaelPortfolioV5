export type Locale = "en" | "hr";

export type ProjectStat = { value: string; label: string };

export type ProjectContent = {
  name: string;
  tech: string;
  problem: string;
  architecture: string;
  stats: ProjectStat[];
};

export type ExperienceContent = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type SkillGroupContent = {
  title: string;
  description: string;
};

export type TranslationShape = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    links: { label: string; href: string }[];
    contact: string;
  };
  hero: {
    roles: string[];
    statement: string;
    availability: string;
    country: string;
    basedIn: string;
    contact: string;
    downloadResume: string;
    exploreWork: string;
  };
  about: {
    summary: string;
    paragraph1: string;
    paragraph2: string;
    heading: string;
    basedInLabel: string;
    experienceLabel: string;
    experienceValue: string;
    focusLabel: string;
    focusValue: string;
  };
  skills: {
    headingPrefix: string;
    headingHighlight: string;
    description: string;
    groups: SkillGroupContent[];
  };
  projects: {
    countSuffix: string;
    heading: string;
    description: string;
    problemLabel: string;
    architectureLabel: string;
    viewImage: string;
    items: ProjectContent[];
  };
  experience: {
    heading: string;
    items: ExperienceContent[];
  };
  quote: {
    quote: string;
    author: string;
    role: string;
  };
  contact: {
    heading: string;
    subheading: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    connectLinkedin: string;
    preferEmail: string;
    successTitle: string;
    successSubtitle: string;
    errorGeneric: string;
    errorNetwork: string;
  };
  footer: {
    builtWith: string;
  };
  language: {
    label: string;
    switchTo: string;
  };
};

export const translations: Record<Locale, TranslationShape> = {
  en: {
    meta: {
      title: "Mihael Pleško - Full Stack Developer",
      description: "Mihael Pleško - Full Stack Developer building web products end to end.",
    },
    nav: {
      links: [
        { label: "Work", href: "#work" },
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Experience", href: "#experience" },
      ],
      contact: "Contact",
    },
    hero: {
      roles: ["Full Stack Developer", "Backend & Systems Engineer", "Creative Developer"],
      statement:
        "I create immersive digital experiences where design, technology, and motion come together.",
      availability: "Available for selected projects",
      country: "Croatia",
      basedIn: "Based in",
      contact: "Contact",
      downloadResume: "Download resume",
      exploreWork: "Explore work",
    },
    about: {
      summary:
        "I build frontends and backends for products that need to hold up under real traffic - code that handles load without breaking, delivered without the fluff.",
      paragraph1:
        "Most of my recent work has been backend-heavy: in-game systems processing over 100 events a second, and services built to stay stable under real concurrent load rather than just look good in a demo.",
      paragraph2:
        "Architecture should stay simple - I push complexity to persistent data boundaries only when it's actually needed, because readability and a solid grasp of the fundamentals prevent outages more reliably than scaling hardware ever does.",
      heading: "Software feels simple when the fundamentals are right.",
      basedInLabel: "Based in",
      experienceLabel: "Experience",
      experienceValue: "3+ years",
      focusLabel: "Focus",
      focusValue: "Backend & web platforms",
    },
    skills: {
      headingPrefix: "What I work with",
      headingHighlight: "day to day",
      description:
        "I build and ship full-stack applications using modern technologies across frontend, backend, databases, and infrastructure.",
      groups: [
        { title: "Frontend", description: "Building responsive and accessible user interfaces." },
        { title: "Backend", description: "Creating APIs and server-side logic that power applications." },
        { title: "Databases", description: "Designing schemas and working with databases for reliable storage." },
        { title: "Infrastructure", description: "Containerizing applications and deploying modern infrastructure." },
      ],
    },
    projects: {
      countSuffix: "projects",
      heading: "Selected work",
      description:
        "A couple of platforms I've built and shipped, from an in-browser Roblox coding runtime to an AI-driven tutoring product.",
      problemLabel: "Problem",
      architectureLabel: "Architecture",
      viewImage: "View image",
      items: [
        {
          name: "Luaxis",
          tech: "GoLang, Containerd, Luau, Zap, Three.js",
          problem: "There were no practical Roblox courses with an in-browser Luau runtime.",
          architecture:
            "Built on a structure with GoLang and backends designed to work within distributed systems, as well docker for the infrastructure.",
          stats: [
            { value: "100+", label: "Capacity of runtime users" },
            { value: "99.98%", label: "Uptime" },
          ],
        },
        {
          name: "Smart Academic Tutor",
          tech: "TypeScript, Node.js, Kafka, Firebase, OpenAI API",
          problem: "Online learning platforms lacked real-time feedback, and pricing was too high.",
          architecture:
            "A microservices architecture with a central recommendation engine that analyzes student interactions to provide personalized learning paths.",
          stats: [
            { value: "+30%", label: "Student engagement" },
            { value: "+20%", label: "Learning outcomes" },
          ],
        },
        {
          name: "This portfolio",
          tech: "ThreeJS, Vue, TypeScript, TailwindCSS, Vite, GSAP",
          problem: "Look how this portfolio is built.",
          architecture:
            "VueJS frontend with ThreeJS for 3D, GSAP for animations, and TailwindCSS for styling. Vite is used for bundling and development.",
          stats: [],
        },
      ],
    },
    experience: {
      heading: "Where I've worked",
      items: [
        {
          company: "SomethingStudio",
          role: "Senior Backend Engineer",
          period: "2024 - 2026",
          bullets: [
            "Developed in-game backend systems.",
            "Processed 100+ event updates per second.",
            "Built web services to manage game events.",
            "Achieved 99.9% successful event delivery.",
            "Reduced manual operations by 40%.",
          ],
        },
        {
          company: "Blackout Innovations",
          role: "Backend Engineer",
          period: "2023 - 2024",
          bullets: [
            "Designed highly concurrent backend services.",
            "Supported 150+ concurrent players.",
            "Handled 150 gameplay events per second.",
            "Reduced processing latency from 120ms to 40ms.",
            "Decreased server-side errors by 35%.",
          ],
        },
      ],
    },
    quote: {
      quote:
        "Architecture must be simple. I push complexity to persistent data boundaries only when necessary - readability matters, and understanding system fundamentals prevents outages.",
      author: "Mihael Pleško",
      role: "On engineering philosophy",
    },
    contact: {
      heading: "Have a project in mind?",
      subheading:
        "I'm currently taking on new freelance and full-time work. Send a note and I'll get back to you within a day or two.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      namePlaceholder: "Jane Doe",
      emailPlaceholder: "jane@company.com",
      messagePlaceholder: "What are you building?",
      sendButton: "Send message",
      sendingButton: "Sending…",
      connectLinkedin: "Connect on LinkedIn",
      preferEmail: "Prefer email?",
      successTitle: "Thanks — your message is on its way.",
      successSubtitle: "I'll get back to you within a day or two.",
      errorGeneric: "Something went wrong. Please try again.",
      errorNetwork: "Network error. Please try again, or email me directly.",
    },
    footer: {
      builtWith: "Built with Vue and Tailwind.",
    },
    language: {
      label: "Language",
      switchTo: "Switch language",
    },
  },
  hr: {
    meta: {
      title: "Mihael Pleško - Full Stack Developer",
      description: "Mihael Pleško - Full Stack Developer koji izrađuje web proizvode od početka do kraja.",
    },
    nav: {
      links: [
        { label: "Radovi", href: "#work" },
        { label: "O meni", href: "#about" },
        { label: "Vještine", href: "#skills" },
        { label: "Iskustvo", href: "#experience" },
      ],
      contact: "Kontakt",
    },
    hero: {
      roles: ["Full Stack Developer", "Backend i sistemski inženjer", "Kreativni developer"],
      statement: "Stvaram digitalna iskustva u kojima se dizajn, tehnologija i pokret spajaju u jedinstvenu cjelinu.",
      availability: "Dostupan za odabrane projekte",
      country: "Hrvatske",
      basedIn: "Iz",
      contact: "Kontakt",
      downloadResume: "Preuzmi CV",
      exploreWork: "Pogledaj radove",
    },
    about: {
      summary:
        "Izrađujem frontend i backend rješenja za proizvode koji moraju izdržati stvarno opterećenje - kod koji podnosi promet bez padova, isporučen bez suvišnih ukrasa.",
      paragraph1:
        "Većina mog nedavnog rada bila je usmjerena na backend: sustavi u igrama koji obrađuju više od 100 događaja u sekundi, te servisi izgrađeni da ostanu stabilni pod stvarnim konkurentnim opterećenjem, a ne samo da dobro izgledaju na demu.",
      paragraph2:
        "Arhitektura mora ostati jednostavna - kompleksnost guram prema granicama trajnih podataka samo kad je to stvarno potrebno, jer čitljivost i dobro razumijevanje temelja pouzdanije spriječavaju ispade nego skaliranje hardvera.",
      heading: "Softver je jednostavan kad su temelji ispravni.",
      basedInLabel: "Lokacija",
      experienceLabel: "Iskustvo",
      experienceValue: "3+ godine",
      focusLabel: "Fokus",
      focusValue: "Backend i web platforme",
    },
    skills: {
      headingPrefix: "Čime se bavim",
      headingHighlight: "iz dana u dan",
      description:
        "Izrađujem i lansiram full-stack aplikacije koristeći moderne tehnologije kroz frontend, backend, baze podataka i infrastrukturu.",
      groups: [
        { title: "Frontend", description: "Izrada responzivnih i pristupačnih korisničkih sučelja." },
        { title: "Backend", description: "Stvaranje API-ja i logike na strani servera koja pokreće aplikacije." },
        { title: "Baze podataka", description: "Dizajniranje shema i rad s bazama podataka za pouzdano skladištenje." },
        { title: "Infrastruktura", description: "Kontejnerizacija aplikacija i implementacija moderne infrastrukture." },
      ],
    },
    projects: {
      countSuffix: "projekta",
      heading: "Odabrani radovi",
      description:
        "Nekoliko platformi koje sam izgradio i objavio, od in-browser Roblox coding runtimea do AI-vođenog proizvoda za podučavanje.",
      problemLabel: "Problem",
      architectureLabel: "Arhitektura",
      viewImage: "Pogledaj sliku",
      items: [
        {
          name: "Luaxis",
          tech: "GoLang, Containerd, Kubernetes, Luau, Zap, Three.js",
          problem: "Nije postojao praktičan Roblox tečaj s in-browser Luau runtimeom.",
          architecture:
            "Izgrađeno na strukturi s GoLangom i backendima dizajniranim da rade unutar distribuiranih sustava, kao i docker za infrastrukturu.",
          stats: [
            { value: "100+", label: "Kapacitet korisnika runtime-a" },
            { value: "99.98%", label: "Dostupnost" },
          ],
        },
        {
          name: "Smart Academic Tutor",
          tech: "TypeScript, Node.js, Kafka, Firebase, OpenAI API",
          problem: "Platforme za online učenje nisu imale povratne informacije u stvarnom vremenu, a cijene su bile previsoke.",
          architecture:
            "Mikroservisna arhitektura s centralnim sustavom preporuka koji analizira interakcije studenata radi personaliziranih putova učenja.",
          stats: [
            { value: "+30%", label: "Angažiranost studenata" },
            { value: "+20%", label: "Ishodi učenja" },
          ],
        },
        {
          name: "Ovaj portfolio",
          tech: "ThreeJS, Vue, TypeScript, TailwindCSS, Vite, GSAP",
          problem: "Pogledaj kako je napravljen ovaj portfolio.",
          architecture:
            "VueJS frontend s ThreeJS-om za 3D, GSAP-om za animacije i TailwindCSS-om za stiliziranje. Vite se koristi za bundling i razvoj.",
          stats: [],
        },
      ],
    },
    experience: {
      heading: "Gdje sam radio",
      items: [
        {
          company: "SomethingStudio",
          role: "Senior Backend Inženjer",
          period: "2024 - 2026",
          bullets: [
            "Razvijao backend sustave unutar igre.",
            "Obrađivao 100+ ažuriranja događaja u sekundi.",
            "Izgradio web servise za upravljanje igraćim događajima.",
            "Postigao 99.9% uspješne dostave događaja.",
            "Smanjio ručne operacije za 40%.",
          ],
        },
        {
          company: "Blackout Innovations",
          role: "Backend Inženjer",
          period: "2023 - 2024",
          bullets: [
            "Dizajnirao visoko konkurentne backend servise.",
            "Podržavao 150+ istovremenih igrača.",
            "Obrađivao 150 igraćih događaja u sekundi.",
            "Smanjio latenciju obrade s 120ms na 40ms.",
            "Smanjio greške na strani servera za 35%.",
          ],
        },
      ],
    },
    quote: {
      quote:
        "Arhitektura mora biti jednostavna. Kompleksnost guram prema granicama trajnih podataka samo kad je potrebno - čitljivost je važna, a razumijevanje temelja sustava spriječava ispade.",
      author: "Mihael Pleško",
      role: "O inženjerskoj filozofiji",
    },
    contact: {
      heading: "Imate ideju za projekt?",
      subheading:
        "Trenutno primam nove freelance i full-time projekte. Pošaljite poruku i javit ću se u roku od dan ili dva.",
      nameLabel: "Ime",
      emailLabel: "Email",
      messageLabel: "Poruka",
      namePlaceholder: "Ana Anić",
      emailPlaceholder: "ana@tvrtka.com",
      messagePlaceholder: "Što gradite?",
      sendButton: "Pošalji poruku",
      sendingButton: "Slanje…",
      connectLinkedin: "Povežimo se na LinkedInu",
      preferEmail: "Radije email?",
      successTitle: "Hvala — vaša poruka je na putu.",
      successSubtitle: "Javit ću se u roku od dan ili dva.",
      errorGeneric: "Nešto je pošlo po zlu. Pokušajte ponovno.",
      errorNetwork: "Greška u mreži. Pokušajte ponovno ili mi pišite direktno na email.",
    },
    footer: {
      builtWith: "Izrađeno u Vue i Tailwindu.",
    },
    language: {
      label: "Jezik",
      switchTo: "Promijeni jezik",
    },
  },
};
