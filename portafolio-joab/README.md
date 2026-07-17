# Portafolio — Joab Alejandro Regil Selvi

Portafolio de desarrollador construido desde cero con **React + Vite**,
**Tailwind CSS v4**, **Framer Motion** y un fondo de particulas propio en
canvas. Cumple los apartados pedidos en las instrucciones del taller
(Bienvenida, Informacion acerca de mi, Conexion a LinkedIn/CompuTrabajo)
y los criterios de la rubrica.

## Como correrlo

Este proyecto usa **pnpm** como gestor de paquetes.

```bash
pnpm install
pnpm dev
```

Abre la URL que muestra la terminal (normalmente http://localhost:5173).

Build de produccion:

```bash
pnpm build
pnpm preview
```

## Estructura (organizada por *features*)

```
src/
  app/            App.jsx (rutas) y HomePage.jsx (compone las secciones)
  features/
    hero/          Bienvenida + carnet 3D colgante (LanyardCard)
    about/         Sobre mi (descripcion + datos generales + stats)
    skills/        Habilidades con barras animadas
    resume/        Educacion, experiencia y certificados (lightbox)
    portfolio/      Tabs Proyectos / Certificados / Tech Stack
      components/   ProjectCard, TechStackGrid
      pages/        ProjectDetailPage (vista de detalle por proyecto)
    contact/        LinkedIn, CompuTrabajo, GitHub, redes
  shared/
    components/     Navbar, Footer, Reveal, Lightbox, ParticlesBackground
    hooks/          useReveal (scroll reveal), useTilt (carnet 3D)
    ui/             SectionHeading
  data/             Todo el contenido en archivos separados (facil de editar)
public/
  assets/
    images/         Foto de perfil (perfil.jpg)
    certificates/   diploma-1.jpg, diploma-2.jpg, diploma-3.jpg
    projects/       Capturas de proyectos
    docs/           CV en PDF
```

## Pendientes para dejarlo 100% listo (solo copiar archivos, el codigo ya esta listo para recibirlos)

1. `public/assets/images/perfil.jpg` - tu foto de perfil.
2. `public/assets/docs/CV-Joab-Regil.pdf` - tu CV (el boton de descarga ya apunta aqui).
3. `public/assets/certificates/diploma-1.jpg`, `diploma-2.jpg`, `diploma-3.jpg` - tus 3 diplomas.
4. Capturas de Conecta Paz y Restaurante Mahallo en `public/assets/projects/` y agregarlas al arreglo `images` de cada proyecto en `src/data/projectsData.js`.
5. Link de GitHub del proyecto Restaurante Mahallo (`src/data/projectsData.js`).
6. Link de tu perfil de CompuTrabajo (`src/data/personalData.js`, arreglo `SOCIALS`).
7. Completar los 4 proyectos placeholder en `src/data/projectsData.js` cuando los tengas listos.
8. Detalles de fechas/puesto en tu experiencia (Talleres R&G y SoyaPac) en `src/data/resumeData.js`.
9. **EmailJS** (para que los mensajes del formulario de contacto lleguen a tu correo): esto requiere que TÚ conectes tu propia cuenta de Gmail (no lo puedo hacer yo). Sigue los pasos detallados dentro de `src/data/emailjsConfig.js` — toma unos 5 minutos en emailjs.com. Mientras no lo configures, el formulario abre tu app de correo como respaldo (no se pierde ningún mensaje, solo no llega directo a la bandeja).
10. Revisa que `PERSONAL.whatsapp` en `src/data/personalData.js` tenga tu número correcto en formato internacional sin espacios ni signos (ej. `50259793746`).

Todo el contenido vive en `src/data/*.js`, asi que editar esos archivos actualiza el sitio completo sin tocar componentes.
