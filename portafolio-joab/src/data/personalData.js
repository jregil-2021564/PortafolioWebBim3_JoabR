export const PERSONAL = {
  name: 'Joab Alejandro',
  lastName: 'Regil Selvi',
  title: 'Desarrollador Web Full Stack',
  age: 18,
  birthDate: '15 de diciembre, 2007',
  location: 'Guatemala',
  email: 'jregil0re@gmail.com',
  phone: '+502 5979-3746',
  whatsapp: '50259793746',
  yearsCoding: 4,
  currentlyStudying: true,
  school: 'Centro Educativo Técnico Laboral Kinal',
  program: 'Perito en Informática — 6to. Perito',
  goals:
    'Graduarme como Perito en Informática e ingresar a la universidad para estudiar Ingeniería en Sistemas.',
  bio: 'Desarrollador web enfocado en backend, con manejo también de frontend y frameworks modernos. Me defino como una persona creativa, curiosa, honesta y humilde: disfruto resolver problemas paso a paso y aprender algo nuevo en cada proyecto.',
  quotes: [
    'Después de la tormenta, viene la calma.',
    'Si el problema tiene solución, ¿para qué me preocupo? Y si no tiene, ¿para qué me voy a preocupar?',
  ],
  traits: ['Creativo', 'Curioso', 'Honesto', 'Humilde'],
  cvUrl: '/assets/docs/CurrículumVitaeJoabRegil.pdf',
  photoUrl: '/assets/ImagenFoto.jpeg',
  aboutPhotoUrl: '/assets/ImagenFoto1.jpeg',
}

export const SOCIALS = [
  {
    label: 'WhatsApp',
    icon: 'whatsapp',
    url: `https://wa.me/${PERSONAL.whatsapp}?text=${encodeURIComponent('¡Hola Joab! Vi tu portafolio y quiero contactarte.')}`,
  },
  {
    label: 'GitHub',
    icon: 'github',
    url: 'https://github.com/jregil-2021564',
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/in/joab-alejandro-regil-selvi-b51577422',
  },
  {
    label: 'CompuTrabajo',
    icon: 'briefcase',
    url: '#',
    pending: true,
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/reg1l_',
  },
  {
    label: 'TikTok',
    icon: 'music',
    url: 'https://www.tiktok.com/@joab_regil',
  },
  {
    label: 'Email',
    icon: 'mail',
    url: 'mailto:jregil0re@gmail.com',
  },
]
