export const profile = {
  name: "Mihael Pleško",
  location: "Krapinske Toplice, Croatia",
  email: "mihahrv@pm.me",
  resumeUrl: {
    en: "/resume/mihael-plesko-resume-en.pdf",
    hr: "/resume/mihael-plesko-resume-hr.pdf",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/mihael-ple%C5%A1ko-5a612233a/",
  },
};

export const projectImages = ["/projects/luaxis.png", "/projects/smartacademictutor.png", "/projects/portfolio.png"];

export const contactForm = {
  web3FormsAccessKey: "4f6fb698-1164-49d1-b803-bb43ba7f1359",
};

export const heroIntro = {
  coordinates: "46.1667°N / 15.8833°E",
};

export const techStack = [
  "go", "typescript", "lua", "python", "php", "nodedotjs",
  "vuedotjs", "react", "html5", "css", "tailwindcss",
  "postgresql", "apachecassandra", "mysql", "firebase", "mongodb",
  "kubernetes", "docker", "linux",
];

export type SkillItem = { name: string; slug: string };

export const skillGroupItems: SkillItem[][] = [
  [
    { name: "Vue", slug: "vuedotjs" },
    { name: "React", slug: "react" },
    { name: "HTML", slug: "html5" },
    { name: "CSS", slug: "css" },
    { name: "Tailwind", slug: "tailwindcss" },
  ],
  [
    { name: "GoLang", slug: "go" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Node.js", slug: "nodedotjs" },
    { name: "Python", slug: "python" },
    { name: "PHP", slug: "php" },
    { name: "Luau", slug: "lua" },
  ],
  [
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Cassandra", slug: "apachecassandra" },
    { name: "MySQL", slug: "mysql" },
    { name: "Firebase", slug: "firebase" },
    { name: "MongoDB", slug: "mongodb" },
  ],
  [
    { name: "Kubernetes", slug: "kubernetes" },
    { name: "Docker", slug: "docker" },
    { name: "Linux", slug: "linux" },
  ],
];
