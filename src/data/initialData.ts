import { SiteData } from '../types';
import defaultHeroBg from '../assets/images/home_background_1787294216170.jpg';

export const INITIAL_SITE_DATA: SiteData = {
  hero: {
    title: 'HELLO WORLD!',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    backgroundImage: defaultHeroBg,
    logoText: 'jeninatiglao.',
    logoUnderlineTarget: 'natiglao',
  },
  profile: {
    name: 'Jenina Tiglao',
    title: 'UI/UX & Graphic Designer',
    greeting: "Hi there, I'm Jenina!",
    shortBio:
      'A passionate UI/UX and Graphic Designer dedicated to crafting intuitive digital products, meaningful user experiences, and compelling visual identities.',
    longBio: [
      'With a deep love for human-centered design, I bridge the gap between complex functionality and effortless visual elegance. My background spans both product design (UI/UX) and brand storytelling (Graphic Design), allowing me to view projects holistically from identity to interaction.',
      'I believe great design is not just how something looks, but how seamlessly it communicates and solves real human problems. Whether crafting design systems from scratch, architecting web applications, or designing bespoke brand collateral, I focus on precision, rhythm, and delight.',
      'When not designing in Figma or Adobe Creative Suite, you can find me exploring typography books, capturing scenic mountain photography, or experimenting with new design frontiers.',
    ],
    philosophy:
      'Design is visual empathy in action. Every pixel, whitespace, and transition should serve a deliberate purpose to empower the user.',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    location: 'Available Worldwide / Remote',
    yearsOfExperience: 5,
    projectsCompleted: 42,
    skills: [
      { id: '1', name: 'UI / UX Design', category: 'UI/UX Design', level: 95 },
      { id: '2', name: 'Design Systems & Tokens', category: 'UI/UX Design', level: 92 },
      { id: '3', name: 'Wireframing & Prototyping', category: 'UI/UX Design', level: 94 },
      { id: '4', name: 'User Research & Testing', category: 'UI/UX Design', level: 88 },
      { id: '5', name: 'Brand Identity & Guidelines', category: 'Graphic Design', level: 90 },
      { id: '6', name: 'Typography & Layout', category: 'Graphic Design', level: 96 },
      { id: '7', name: 'Print & Editorial Design', category: 'Graphic Design', level: 86 },
      { id: '8', name: 'Figma & FigJam', category: 'Tools', level: 98 },
      { id: '9', name: 'Adobe Photoshop & Illustrator', category: 'Tools', level: 92 },
      { id: '10', name: 'Adobe After Effects', category: 'Tools', level: 80 },
    ],
    experiences: [
      {
        id: 'exp-1',
        role: 'Senior Product & Brand Designer',
        company: 'Nova Digital Studio',
        period: '2023 - Present',
        description:
          'Leading end-to-end UX architecture and visual design systems for enterprise SaaS clients and modern consumer web apps.',
        achievements: [
          'Established modular design systems reducing product shipping cycles by 35%',
          'Redesigned core conversion funnels for fintech clients leading to +28% retention',
          'Mentored junior designers and established cross-functional Figma libraries',
        ],
      },
      {
        id: 'exp-2',
        role: 'UI/UX & Visual Designer',
        company: 'Aura Interactive Lab',
        period: '2021 - 2023',
        description:
          'Created interactive user experiences, web applications, and brand identities for innovative startups and digital brands.',
        achievements: [
          'Designed over 20+ responsive web platforms and mobile applications',
          'Conducted qualitative user interviews, usability audits, and interactive prototyping',
          'Delivered comprehensive brand style guides, packaging, and digital collateral',
        ],
      },
      {
        id: 'exp-3',
        role: 'Graphic & Digital Designer',
        company: 'Creative Horizon Studio',
        period: '2019 - 2021',
        description:
          'Crafted digital marketing campaigns, typography systems, editorial layouts, and brand visual assets.',
        achievements: [
          'Developed visual identities for 15+ lifestyle and tech boutique clients',
          'Collaborated closely with web developers to maintain visual fidelity in production',
        ],
      },
    ],
    services: [
      {
        id: 'srv-1',
        title: 'UI/UX Product Design',
        description:
          'Creating intuitive, accessible web and mobile interfaces built around verified user needs and seamless interaction flows.',
        icon: 'Layout',
      },
      {
        id: 'srv-2',
        title: 'Brand Identity & Visual Systems',
        description:
          'Crafting distinctive brand languages, logos, typography hierarchies, color systems, and comprehensive style guides.',
        icon: 'Palette',
      },
      {
        id: 'srv-3',
        title: 'Design Systems & Component Libraries',
        description:
          'Building scalable, developer-friendly Figma design systems with auto-layout, variants, and design token architectures.',
        icon: 'Layers',
      },
      {
        id: 'srv-4',
        title: 'Interactive Prototyping & Motion',
        description:
          'Bringing interfaces to life through micro-interactions, responsive prototypes, and dynamic user journey testing.',
        icon: 'Sparkles',
      },
    ],
  },
  projects: [
    {
      id: 'proj-1',
      title: 'AeroPay Fintech Mobile App',
      category: 'UI/UX Design',
      client: 'Aero Financial Ltd.',
      year: '2024',
      role: 'Lead Product Designer',
      duration: '4 Months',
      shortDesc:
        'A streamlined mobile banking experience designed for effortless wealth tracking, instant global transfers, and modern budget insights.',
      challenge:
        'Users felt overwhelmed by dense financial tables, hidden fees, and convoluted multi-step authentication processes in legacy apps.',
      solution:
        'Crafted a minimalist card-based dashboard with dynamic card flipping, biometric frictionless authentication, and visual spending breakdown charts.',
      impact:
        'Increased daily active user engagement by 44% and achieved a 4.9-star rating across 10,000+ App Store reviews within the first 3 months.',
      coverImage:
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      ],
      tags: ['Figma', 'UI/UX', 'Fintech', 'Mobile App', 'Design System', 'Micro-interactions'],
      figmaUrl: 'https://figma.com/@jeninatiglao',
      liveUrl: 'https://example.com/aeropay',
      featured: true,
    },
    {
      id: 'proj-2',
      title: 'Solstice Design System & UI Kit',
      category: 'UI/UX Design',
      client: 'Solstice Cloud Platform',
      year: '2024',
      role: 'Design System Architect',
      duration: '3 Months',
      shortDesc:
        'A comprehensive, multi-brand design system featuring 250+ accessible components, tokenized colors, and dark/light mode themes.',
      challenge:
        'A rapidly growing engineering team faced visual inconsistency, fragmented code bases, and high design debt across 6 product suites.',
      solution:
        'Standardized 4-level design tokens (Global, Alias, Component, Theme), built an exhaustive Figma library with auto-layout 5.0, and documented accessibility states.',
      impact:
        'Cut cross-team UI development delivery time by 50% and achieved 100% WCAG AA color compliance across all enterprise dashboards.',
      coverImage:
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      ],
      tags: ['Design System', 'Tokens', 'Figma', 'Accessibility', 'Component Library'],
      figmaUrl: 'https://figma.com/@jeninatiglao',
      featured: true,
    },
    {
      id: 'proj-3',
      title: 'Botanica Artisanal Branding & Packaging',
      category: 'Branding',
      client: 'Botanica Organics',
      year: '2023',
      role: 'Brand & Graphic Designer',
      duration: '2 Months',
      shortDesc:
        'Bespoke visual identity, organic packaging system, and tactile editorial print collateral for an eco-luxury skincare house.',
      challenge:
        'Creating a distinct high-end visual tone in a saturated natural beauty market without relying on generic green leaf clichés.',
      solution:
        'Developed custom serif letterforms, earthy foil-stamped packaging sleeves, minimalist embossed labels, and a serene mist-inspired color palette.',
      impact:
        'Helped brand secure shelf space across 30+ premium boutiques nationwide and drove a 180% increase in unboxing social media shares.',
      coverImage:
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
      ],
      tags: ['Branding', 'Packaging', 'Typography', 'Print', 'Art Direction', 'Illustrator'],
      featured: true,
    },
    {
      id: 'proj-4',
      title: 'Pulse Analytics Dashboard',
      category: 'Web Design',
      client: 'Pulse Metrics Inc.',
      year: '2023',
      role: 'Lead UI/UX Designer',
      duration: '3 Months',
      shortDesc:
        'A real-time data visualization platform and control center for marketing teams and business intelligence directors.',
      challenge:
        'Transforming millions of telemetry and revenue data points into legible, high-contrast, actionable intelligence without visual clutter.',
      solution:
        'Structured a modular grid with customizable widget layouts, synchronized timeline scrubbers, and intuitive filter drawers.',
      impact:
        'Reported a 60% decrease in onboarding time for new analysts and improved workflow speed for daily executive report generation.',
      coverImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      ],
      tags: ['Dashboard', 'Data Viz', 'SaaS', 'UI/UX', 'Figma', 'Web Design'],
      featured: false,
    },
    {
      id: 'proj-5',
      title: 'Monolith Architectural Monograph',
      category: 'Graphic Design',
      client: 'Monolith Studio Press',
      year: '2023',
      role: 'Editorial & Graphic Designer',
      duration: '6 Weeks',
      shortDesc:
        'A 240-page hardcover architectural publication exploring brutalist structures, concrete textures, and spatial proportions.',
      challenge:
        'Balancing heavy architectural photography with rigorous typographic grid systems and negative space.',
      solution:
        'Constructed a 12-column dynamic grid, custom dual-tone photo treatments, and tactile die-cut covers with blind debossing.',
      impact:
        'Awarded Regional Editorial Design Distinction and completely sold out its initial 1,500 limited first-edition print run.',
      coverImage:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      ],
      tags: ['Editorial', 'Typography', 'InDesign', 'Graphic Design', 'Print Production'],
      featured: false,
    },
    {
      id: 'proj-6',
      title: 'Kumo Cloud Storage Mobile App',
      category: 'Mobile App',
      client: 'Kumo Tech',
      year: '2022',
      role: 'UI/UX Designer',
      duration: '2 Months',
      shortDesc:
        'Intuitive cloud storage and file-sharing app built with delightful gesture interactions, dark mode, and collaborative spaces.',
      challenge:
        'File management apps often feel clinical and utilitarian, lacking visual warmth and smooth touch feedback.',
      solution:
        'Introduced spring-based drag physics, thumbnail zoom previews, and instant multi-select gestures with haptic feedback cues.',
      impact:
        'Over 85% of beta testers rated the gesture file-management experience significantly faster than conventional list navigation.',
      coverImage:
        'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      ],
      tags: ['Mobile UX', 'Gestures', 'Figma', 'Prototyping', 'iOS / Android'],
      featured: false,
    },
  ],
  thoughts: [
    {
      id: 'thought-1',
      title: 'The Anatomy of a Modern Design System: Beyond Components',
      excerpt:
        'Why tokens, naming conventions, and documentation culture matter far more than just piling up button variants in your Figma library.',
      content: `When designers hear "design system", their first instinct is often to open Figma and start designing button variants in every imaginable state. While component libraries are the visible surface, the true bedrock of any sustainable design system lies in architecture, token taxonomy, and cross-disciplinary governance.

### 1. The Power of Semantic Tokens
Design tokens transform subjective styling into durable, shareable constants. Moving from hardcoded hex values (like #7ACAD2) to semantic roles (like --color-accent-primary or --surface-elevated) ensures that:
- Dark mode and multi-theme adaptability happen automatically without rewriting component logic.
- Designers and engineers share a single, unambiguous vocabulary during handoff.
- Global rebranding or accessibility adjustments can be rolled out across an entire product suite in minutes.

### 2. Guardrails, Not Handcuffs
A common trap is making a design system so rigid that feature teams feel constrained. The best design systems act as accelerators, providing robust baselines (accessibility, typography scales, spacing grids) while leaving room for expressive exploration in specialized workflows.

### 3. Living Documentation
If a component isn't documented with clear "when to use" and "when not to use" guidelines, it will inevitably be misused. Treat documentation as a core product deliverable rather than an afterthought.`,
      readTime: '5 min read',
      date: 'Aug 14, 2026',
      category: 'Design Systems',
      coverImage:
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      tags: ['Design Systems', 'Figma', 'UI Architecture', 'Design Tokens'],
      published: true,
    },
    {
      id: 'thought-2',
      title: 'Crafting Meaningful Micro-Interactions in Digital Products',
      excerpt:
        'How subtle transitions, tactile physics, and optical feedback bridge the emotional gap between human intention and digital response.',
      content: `The difference between a functional product and a memorable one often comes down to the micro-details. A button that depresses with natural spring physics, a checkbox that draws itself with crisp pacing, or a subtle haptic click when an item snaps into place—these are the subtle delights that make software feel alive.

### Why Motion Is Functional, Not Decorative
1. **Spatial Continuity**: Motion explains where an element came from and where it is going, preventing cognitive disorientation when panels open or views transition.
2. **Immediate Confirmation**: In high-stakes actions like sending payments or deleting files, deliberate animation states give users confidence that their command was registered.
3. **Pacing and Timing**: Micro-interactions should respect user momentum. Quick UI responses (150ms–250ms) prevent sluggishness, while easing curves (cubic-bezier) emulate real-world inertia.

When designing micro-interactions, ask yourself: Does this animation clarify state, reduce perceived latency, or communicate success? If the answer is yes, it earns its place on screen.`,
      readTime: '4 min read',
      date: 'Jul 28, 2026',
      category: 'Interaction Design',
      coverImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      tags: ['UX', 'Micro-interactions', 'Motion Design', 'Prototyping'],
      published: true,
    },
    {
      id: 'thought-3',
      title: 'Balancing Aesthetic Minimalism with Complex SaaS Workflows',
      excerpt:
        'Strategies for decluttering enterprise interfaces without sacrificing data density or power-user efficiency.',
      content: `Enterprise software has historically suffered from information overload: dense spreadsheets, cluttered toolbars, and walls of numbers. While modern consumer design champions extreme whitespace and large display typography, enterprise users genuinely need rapid access to dense information.

The solution is not stripping away features, but **Progressive Disclosure** and **Visual Hierarchy**:
- **Information Layering**: Keep 80% of routine actions immediately visible, while housing secondary batch controls or niche filters in slide-over drawers or contextual hover states.
- **Contrast Ratios**: Use subtle divider lines, mathematical padding scales, and muted neutral tints (#F6F6F6 / #E2F2F4) rather than heavy borders to delineate complex modules.
- **Keyboard Accelerators**: Provide power users with shortcut triggers and command palettes (Cmd+K) so they can execute complex queries without clicking through deep menus.`,
      readTime: '6 min read',
      date: 'Jun 19, 2026',
      category: 'Product Strategy',
      coverImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      tags: ['SaaS', 'Product Design', 'Information Architecture', 'Usability'],
      published: true,
    },
  ],
  connect: {
    heading: "Let's build something exceptional together.",
    subheading:
      'Have an upcoming project, design system initiative, or brand transformation? Drop me a message and let’s talk.',
    email: 'jeninamtiglao@gmail.com',
    location: 'Manila, Philippines / Remote Worldwide',
    availability: 'Open for Select Freelance & Full-time Roles',
    socials: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com/in/jeninatiglao',
      behance: 'https://behance.net/jeninatiglao',
      dribbble: 'https://dribbble.com',
      github: 'https://github.com',
      email: 'jeninamtiglao@gmail.com',
    },
  },
};
