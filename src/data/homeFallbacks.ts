import { courses } from "./courses";

export const featuredCoursesFallback = courses.slice(0, 3).map((course) => ({
  id: `fallback-course-${course.id}`,
  slug: course.slug,
  title: course.title,
  image: course.image,
  badge: course.badge,
  level: course.level,
  lessons: course.lessons,
  students: course.students,
  rating: course.rating,
  price: course.price,
  sale_price: course.salePrice,
  categories: {
    name: course.category,
  },
}));

export const testimonialsFallback = [
  {
    id: "fallback-testimonial-1",
    name: "Mariana Alves",
    initials: "MA",
    text: "Consegui minha recolocação profissional em poucos meses. As aulas são práticas e diretas ao ponto.",
    rating: 5,
    role: "Auxiliar Administrativa",
  },
  {
    id: "fallback-testimonial-2",
    name: "Ricardo Souza",
    initials: "RS",
    text: "Os cursos me deram segurança para atuar melhor no trabalho e evoluir na carreira.",
    rating: 5,
    role: "Analista de Suporte",
  },
  {
    id: "fallback-testimonial-3",
    name: "Patrícia Lima",
    initials: "PL",
    text: "Gostei muito da didática e do acompanhamento. É uma excelente porta de entrada para quem quer aprender.",
    rating: 5,
    role: "Empreendedora",
  },
];

export const instructorsFallback = [
  {
    id: "fallback-instructor-1",
    name: "Carlos Silva",
    role: "Especialista em TI",
    avatar: courses[0].instructor.avatar,
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "fallback-instructor-2",
    name: "Ana Costa",
    role: "Desenvolvedora Sênior",
    avatar: courses[1].instructor.avatar,
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "fallback-instructor-3",
    name: "Marcos Oliveira",
    role: "UI/UX Designer Lead",
    avatar: courses[2].instructor.avatar,
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "fallback-instructor-4",
    name: "Juliana Mendes",
    role: "Head de Marketing",
    avatar: courses[3].instructor.avatar,
    linkedin: "#",
    twitter: "#",
  },
];

export const blogPostsFallback = [
  {
    id: "fallback-post-1",
    title: "5 habilidades digitais que mais empregam em 2026",
    excerpt: "Veja quais competências estão em alta e como começar a estudá-las ainda hoje.",
    category: "Carreira",
    date: "08 Abr 2026",
    image: courses[5].image,
    external_url: "#",
    published: true,
  },
  {
    id: "fallback-post-2",
    title: "Como escolher o curso ideal para mudar de profissão",
    excerpt: "Um guia prático para identificar seu objetivo e investir no curso certo.",
    category: "Educação",
    date: "02 Abr 2026",
    image: courses[2].image,
    external_url: "#",
    published: true,
  },
  {
    id: "fallback-post-3",
    title: "Mercado digital: áreas com mais oportunidades para iniciantes",
    excerpt: "Conheça segmentos com alta demanda para quem está começando agora.",
    category: "Mercado",
    date: "27 Mar 2026",
    image: courses[3].image,
    external_url: "#",
    published: true,
  },
];
