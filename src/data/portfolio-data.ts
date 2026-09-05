import { PortfolioData } from "@/types/portfolio";

export const PORTFOLIO_DATA: PortfolioData = {
  meta: {
    badge: "PORTFOLIO",
    issue: "ISSUE 01",
    folio: "FOLIO 001",
    verticalLabel: "INDEX — VOL. I",
  },
  identity: {
    name: "ABDULLAH AL MAKSUD",
    role: "FRONTEND ENGINEER",
    subRole: "ANALYZE · DESIGN · DEVELOP",
    consultation: {
      tag: "DISCIPLINES & PURSUITS",
      headline:
        "Frontend engineer crafting reliable, high-performance web applications. Writing, translating literature, and designing interfaces along the way.",
      offerings: [
        {
          label: "Frontend Engineering",
          category: "SYSTEMS & CODE",
          description:
            "Building deterministic, resilient user interfaces and web applications using React, Next.js, and TypeScript.",
        },
        {
          label: "Translation & Writing",
          category: "LITERATURE & ESSAYS",
          description:
            "Translating essays, monographs, and books between English and Bengali, exploring ideas with linguistic care.",
        },
        {
          label: "Interface Design",
          category: "TYPOGRAPHY & UI",
          description:
            "Crafting clean, editorial design systems, modular grids, and thoughtful digital reading experiences.",
        },
      ],
      ctaText: "CONNECT",
    },
    navItems: [
      { label: "ABOUT", href: "/about" },
      { label: "WORK", href: "/#work" },
      { label: "BLOG", href: "/blog" },
      { label: "BOOKS", href: "/#books" },
      { label: "DESIGN", href: "/#design" },
      { label: "CONTACT", href: "/contact" },
    ],
  },
  heroBanner: {
    imageUrl: "/images/portrait-full.png",
    alt: "Abdullah Al Maksud — Lead Architect & Consultant",
    caption: "Geometric Structural Paradigm",
  },
  enterpriseArchitecture: {
    category: "TECHNICAL CASE STUDIES",
    titleLine1: "STRATEGIC",
    titleLine2: "BLUEPRINTS",
    projects: [
      {
        id: "dashboard-systems",
        tag: "01 / ANALYTICS",
        title: "DASHBOARD SYSTEMS",
        description:
          "High-performance analytics platform engineered with React and Next.js, prioritizing real-time data visualization and theoretical frameworks for state management. Emphasizing fault-tolerant design and sub-frame rendering.",
        techStack: [
          "React",
          "Next.js",
          "TypeScript",
          "WebSockets",
          "Apache Kafka",
          "D3.js",
          "Zustand",
        ],
        metrics: [
          "Sub-16ms frame render times on 100k+ real-time points",
          "99.999% availability under multi-region failover",
          "Modular micro-frontend architecture supporting 12 domain teams",
        ],
        fullContent: `
# Dashboard Systems: High-Throughput Stream Visualization

### Vision & Context
Modern analytics platforms often collapse under the weight of unstructured reactive state and uncontrolled data ingestion pipelines. When dealing with hundreds of thousands of concurrent data points, conventional frontend architectures suffer from memory leaks and frame drops.

### Architectural Highlights:
1. **Memory-Efficient Pipelines**: Implemented ring-buffer data ingestion decoupled from the UI render loop via Web Workers and OffscreenCanvas.
2. **Deterministic UI State**: Utilized strict state machines to prevent cascading component re-renders.
3. **Resilient Network Topology**: Automatic backpressure management and graceful degradation during network throttling.
        `,
      },
      {
        id: "headless-infrastructure",
        tag: "02 / COMMERCE",
        title: "HEADLESS INFRASTRUCTURE",
        description:
          "Scalable storefront architecture designed for high-traffic events. Implemented robust state reconciliation patterns to ensure transactional integrity across distributed regions.",
        techStack: [
          "Edge Functions",
          "GraphQL",
          "Next.js SSR/ISR",
          "Redis Cache",
          "Event-Driven Sync",
        ],
        metrics: [
          "50ms TTFB globally across 28 edge regions",
          "Zero downtime during flash sales (>150,000 orders/minute)",
          "Strict transactional UI state guarantees",
        ],
        fullContent: `
# Headless Infrastructure: Storefront Systems

### The Challenge of Distributed Commerce
Global headless commerce architectures face acute challenges in multi-region consistency: inventory desynchronization, stale cart representations, and high latency during peak bursts.

### Engineering Approach:
1. **Edge Caching**: Configured surrogate keys and distributed stale-while-revalidate caches.
2. **Optimistic UI**: Client-side transactional state with verifiable receipts for checkout flows.
3. **Fault-Tolerant Pipelines**: Isolated payment gateway states and resilient asynchronous queues.
        `,
      },
    ],
  },
  literatureEssays: {
    category: "IMAGINATIVE DISCOURSE",
    titleLine1: "THOUGHTS &",
    titleLine2: "WRITINGS",
    imageUrl: "/images/image.png",
    imageAlt: "Abdullah Al Maksud - Book Publication",
    items: [
      {
        id: "thermodynamics-in-state",
        tag: "ESSAY",
        title: "THERMODYNAMICS IN STATE",
        description:
          "An exploration of parallels between physical entropy and software complexity. Formulating mitigation strategies for modern frontend architectures with predictable data flows.",
        date: "2024.Q2",
        readTime: "8 MIN READ",
        fullContent: `
# Thermodynamics in State: Physical Entropy in Software Systems

### The Law of Architectural Entropy
In closed systems, entropy naturally increases over time unless external work is applied. Similarly, a frontend codebase left unconstrained tends toward maximum disorder: tangled bidirectional dependencies, ghost renders, and unpredictable mutation states.

### Applying Thermodynamic Principles to Code:
1. **The Principle of Least Action**: Data should travel the shortest deterministic trajectory from server to view.
2. **Enthalpy & State Boundaries**: Isolate volatile, high-energy state (e.g. real-time cursors, telemetry) from foundational business state.
3. **Thermal Equilibrium**: UI consistency is achieved when the client state converges asymptotically with backend domain truths.
        `,
      },
      {
        id: "the-logic-of-ui",
        tag: "PUBLICATION",
        title: "THE LOGIC OF UI",
        description:
          "The intersection of analytical logic and intuitive user interface patterns. A guide to structural interface design aimed at reducing cognitive load in complex applications.",
        date: "2024.Q1",
        readTime: "14 MIN READ",
        fullContent: `
# The Logic of UI: Formal Methods in Interface Design

### Abstract
User interface design is frequently treated as purely aesthetic, when in reality high-density software requires structural clarity. Cognitive friction arises not from dense data, but from structural ambiguity and illogical visual hierarchies.

### Fundamental Theses:
1. **Spatial Orthogonality**: Every coordinate axis in a dashboard must represent an unambiguous dimension of information.
2. **Type-Safe Layouts**: Layout components should guarantee visual invariants regardless of content length or dynamic localization.
3. **Perceptual Bandwidth Optimization**: Leveraging pre-attentive visual attributes to convey telemetry without cognitive overload.
        `,
      },
      {
        id: "bengali-typography-digital-era",
        tag: "ESSAY // TYPOGRAPHY",
        title: "ডিজিটাল ইন্টারফেসে বাংলা টাইপোগ্রাফির নান্দনিক ব্যাকরণ",
        description:
          "ডিজিটাল মাধ্যমে বাংলা হরফের মাত্রা, উল্লম্ব স্পেসিং, অপটিক্যাল কার্নিং এবং আধুনিক ইউজার ইন্টারফেসে বাংলা অক্ষরের স্থাপত্য নিয়ে বিশদ অনুসন্ধান ও এডিটরিয়াল প্রকাশনা।",
        date: "2024.Q3",
        readTime: "6 MIN READ",
        fullContent: `
# ডিজিটাল ইন্টারফেসে বাংলা টাইপোগ্রাফির নান্দনিক ব্যাকরণ

### হরফের স্থাপত্য ও সমসাময়িক প্রেক্ষাপট
বাংলা ভাষা ও লিপির ইতিহাস শতাব্দী প্রাচীন হলেও ডিজিটাল প্ল্যাটফর্মে এর নান্দনিক প্রয়োগ এখনো অনেকাংশেই অবহেলিত। বেশিরভাগ আধুনিক ওয়েবসাইট ও অ্যাপ্লিকেশনে ইংরেজির সমান্তরালে বাংলা টেক্সট রেন্ডার করার সময় অনুপাতহীন লাইন-হাইট ও ভুল ফন্ট চয়েসের কারণে ভিজ্যুয়াল ব্যালান্স নষ্ট হয়।

### টাইপোগ্রাফিক নীতিসমূহ:
1. **মাত্রা ও ক্যারেক্টার ব্যালান্স**: বাংলা হরফের মাত্রারেখা (Headline) এবং নিচের ফলা ও কারচিহ্নের সঠিক উল্লম্ব অনুপাত নিশ্চিত করা।
2. **অসমমিতিক হোয়াইটস্পেস**: অক্ষরের চারপাশে পর্যাপ্ত শ্বাস নেওয়ার জায়গা (Negative Space) বজায় রাখা যাতে দীর্ঘ পাঠেও চোখের ক্লান্তি না আসে।
3. **এডিটরিয়াল লেআউট ইন্টিগ্রেশন**: ম্যাগাজিন ও পাবলিকেশন স্টাইলের সাথে বাংলা ফন্টের ছন্দময় সংমিশ্রণ।

### আমাদের দৃষ্টিভঙ্গি
ডিজিটাল ইন্টারফেসে বাংলা কেবল একটি ভাষা নয়, এটি একটি অনন্য ভিজ্যুয়াল আর্ট। সঠিক টাইপফেস ও গ্রিড বিন্যাসের মাধ্যমে বাংলা ইন্টারফেসকে বিশ্বমানের সৌন্দর্য দেওয়া সম্ভব।
        `,
      },
      {
        id: "onubad-o-shunnata",
        tag: "ESSAY // TRANSLATION",
        title: "অনুবাদ ও শূন্যতা: শব্দের অন্তরালের নীরবতা",
        description:
          "দর্শন ও সাহিত্য অনুবাদে মূল ভাষার অন্তরালের নীরবতা, সাংস্কৃতিক রূপান্তর ও মেটাফোর অনুবাদের রূপতত্ত্ব নিয়ে একটি সংক্ষিপ্ত আত্মানুসন্ধান।",
        date: "2024.Q2",
        readTime: "5 MIN READ",
        fullContent: `
# অনুবাদ ও শূন্যতা

### শব্দের অন্তরালের স্তব্ধতা
অনুবাদ কেবল এক ভাষার শব্দকে অন্য ভাষার শব্দ দিয়ে প্রতিস্থাপন করা নয়। প্রতিটি শক্তিশালী সাহিত্যের একটি অদৃশ্য শরীর থাকে—যেটি উচ্চারিত শব্দের চেয়ে অনুচ্চারিত ভাবের ওপর বেশি নির্ভর করে।

### অনুবাদের মূল সূত্র:
1. **ছন্দ ও নীরবতা**: বাক্যের মধ্যকার বিরতি এবং স্বরক্ষেপণকে লক্ষ্য ভাষায় বাঁচিয়ে রাখা।
2. **সাংস্কৃতিক রূপান্তর**: রূপকগুলোকে আক্ষরিক অনুবাদ না করে তার অন্তর্নিহিত দার্শনিক ভাবকে পুনর্নির্মাণ করা।
3. **কণ্ঠস্বরের সততা**: লেখকের মূল সুর বিকৃত না করে লক্ষ্য ভাষার স্বাভাবিক প্রবাহ বজায় রাখা।
        `,
      },
    ],
  },
  designSystems: {
    category: "AESTHETIC PARADIGMS",
    title: "SYSTEMS I DESIGN",
    imageUrl: "/images/wireframe-cube.jpg",
    imageAlt: "Isometric wireframe 3D geometric volumetric cubes over perspective grid",
    modules: [
      {
        id: "physics-simulator",
        tag: "VISUALIZER",
        title: "PHYSICS SIMULATOR",
        description:
          "A minimalist, web-based tool demonstrating thermodynamic laws through interactive, high-fidelity canvas design.",
        type: "interactive",
        isInteractive: true,
        details: {
          overview:
            "Interactive physics engine simulating kinetic particles, entropy propagation, and thermal convection in a strict monochromatic canvas.",
          keyPoints: [
            "Real-time particle dynamics (Euler & Verlet integration)",
            "Configurable thermodynamic parameters (entropy, temperature, viscosity)",
            "Minimalist brutalist monochromatic visualizer",
          ],
        },
      },
      {
        id: "editorial-theme",
        tag: "FRAMEWORK",
        title: "EDITORIAL THEME",
        description:
          "A design system inspired by traditional print media, focusing on elegant typography, asymmetrical whitespace, and strict modular grids.",
        type: "standard",
        details: {
          overview:
            "Bridging the golden age of Swiss modernist print design with reactive web interfaces. Built around 1px hairline rules, monospace data badges, and high-contrast typographic hierarchy.",
        },
      },
      {
        id: "tokenization-strategies",
        tag: "ARCHITECTURE",
        title: "TOKENIZATION STRATEGIES",
        description:
          "Establishing robust, semantic design token hierarchies to ensure visual consistency and scalable theming across multi-brand ecosystems.",
        type: "standard",
        details: {
          overview:
            "Multi-tiered design token architecture spanning Global Core, Semantic Intent, and Component-scoped tokens with automated translation pipelines.",
        },
      },
      {
        id: "component-lifecycle",
        tag: "GOVERNANCE",
        title: "COMPONENT LIFECYCLE",
        description:
          "Structured management of UI component evolution, from initial proposal and prototyping through deprecation, maintaining strict version control.",
        type: "standard",
        details: {
          overview:
            "Strict RFC-driven governance model with automated breaking-change detection, AST codemods for seamless upgrades, and sunsetting protocols.",
        },
      },
    ],
  },
  strategicAdvisory: {
    badge: "04 / FELLOWSHIP & ADVISORY",
    availability: "STATUS: OPEN FOR COLLABORATION",
    category: "SYSTEMS & PERSPECTIVES",
    headline: "ENGINEERING, DESIGN & LITERARY DIALOGUE",
    statement:
      "Collaborating on frontend architecture, design systems, open-source initiatives, and translation projects. Driven by a love for craft, clarity, and well-made things.",
    pillars: [
      {
        number: "01",
        title: "FRONTEND ARCHITECTURE",
        description:
          "Formulating deterministic data flows, WebWorker offloading, and reliable Next.js/React application structures.",
      },
      {
        number: "02",
        title: "CORE WEB VITALS & SPEED",
        description:
          "Performance audits, efficient rendering pipelines, edge caching, and smooth interaction latency benchmarks.",
      },
      {
        number: "03",
        title: "DESIGN SYSTEMS & TYPOGRAPHY",
        description:
          "Establishing thoughtful token registries, headless UI component libraries, and clean typography systems.",
      },
      {
        number: "04",
        title: "WRITING & TRANSLATION",
        description:
          "Contextual adaptation of technical essays, literature, and philosophy between English and Bengali.",
      },
    ],
    cta: {
      primaryText: "GET IN TOUCH",
      secondaryText: "DOWNLOAD RESUME / CV (PDF)",
      email: "/contact",
    },
  },
  footer: {
    copyright: "© 2024 ABDULLAH AL MAKSUD",
    rights: "ALL RIGHTS RESERVED",
    socials: [
      { label: "GITHUB", url: "https://github.com", isExternal: true },
      { label: "LINKEDIN", url: "https://linkedin.com", isExternal: true },
      { label: "TWITTER", url: "https://x.com", isExternal: true },
      { label: "EMAIL", url: "/contact", isExternal: false },
    ],
  },
};
