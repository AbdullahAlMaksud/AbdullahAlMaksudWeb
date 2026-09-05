import { BlogPost } from "@/types/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "thermodynamics-in-state",
    title: "STATE THERMODYNAMICS",
    category: "THEORETICAL FRAMEWORKS",
    tag: "ESSAY // ARCHITECTURE",
    type: "Essay",
    date: "AUG 2024",
    readTime: "8 MIN READ",
    language: "en",
    excerpt:
      "An analytical exploration of parallels between physical entropy and software complexity. Formulating mitigation strategies for modern frontend architectures.",
    content: `
# STATE THERMODYNAMICS

### The Law of Architectural Entropy
In closed systems, entropy naturally increases over time unless external work is applied. Similarly, a frontend codebase left unconstrained tends toward maximum disorder: tangled bidirectional dependencies, ghost renders, and unpredictable mutation states.

### Applying Thermodynamic Principles to Code:
1. **The Principle of Least Action**: Data should travel the shortest deterministic trajectory from server to view.
2. **Enthalpy & State Boundaries**: Isolate volatile, high-energy state (e.g. real-time cursors, telemetry) from foundational business state.
3. **Thermal Equilibrium**: UI consistency is achieved when the client state converges asymptotically with backend domain truths.

### Mitigating Software Heat Death
When applications scale across dozens of micro-frontends and multi-region edge nodes, uncontrolled reactive triggers act as thermal noise. By adopting unidirectional state machines, ring-buffered worker pipelines, and immutable snapshotting, we restore structural equilibrium.
    `,
  },
  {
    slug: "the-logic-of-ui",
    title:
      "THE LOGIC OF UI: FORMAL METHODS AND MATHEMATICAL RIGOR IN HIGH-DENSITY ENTERPRISE SYSTEMS",
    category: "AESTHETIC PARADIGMS",
    tag: "PUBLICATION // DESIGN",
    type: "Monograph",
    date: "JUL 2024",
    readTime: "12 MIN READ",
    language: "en",
    excerpt:
      "Detailing the intersection of rigorous analytical logic and intuitive user interface patterns. A comprehensive guide to structural interface design aimed at reducing cognitive load in complex applications.",
    content: `
# THE LOGIC OF UI: FORMAL METHODS AND MATHEMATICAL RIGOR IN HIGH-DENSITY ENTERPRISE SYSTEMS

### Abstract
User interface design is frequently treated as purely aesthetic, when in reality high-density enterprise software requires mathematical rigor. Cognitive friction arises not from dense data, but from structural ambiguity and illogical visual hierarchies.

### Fundamental Theses:
- **Spatial Orthogonality**: Every coordinate axis in a dashboard must represent an unambiguous dimension of information.
- **Type-Safe Layouts**: Layout components should guarantee visual invariants regardless of content length or dynamic localization.
- **Perceptual Bandwidth Optimization**: Leveraging pre-attentive visual attributes (luminance contrast, spatial proximity) to convey critical system telemetry without cognitive overload.

### The Mathematics of Information Density
A well-structured editorial layout allows the human eye to parse hierarchical relationships effortlessly. Through strict hairline grids and deliberate typography pairing, interface complexity is tamed.
    `,
  },
  {
    slug: "bengali-typography-digital-era",
    title: "ডিজিটাল ইন্টারফেসে বাংলা টাইপোগ্রাফির নান্দনিক ব্যাকরণ",
    category: "TYPOGRAPHY & DESIGN",
    tag: "ESSAY // BENGALI TYPOGRAPHY",
    type: "Article",
    date: "JUN 2024",
    readTime: "6 MIN READ",
    language: "bn",
    excerpt:
      "ডিজিটাল মাধ্যমে বাংলা হরফের মাত্রা, উল্লম্ব স্পেসিং, অপটিক্যাল কার্নিং এবং আধুনিক ইউজার ইন্টারফেসে বাংলা অক্ষরের স্থাপত্য নিয়ে বিশদ অনুসন্ধান।",
    content: `
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
    slug: "zero-downtime-nextjs-architecture",
    title:
      "ZERO-DOWNTIME MULTI-REGION NEXT.JS ARCHITECTURES FOR HIGH-CONCURRENCY COMMERCE PLATFORMS",
    category: "ENGINEERING & CLOUD",
    tag: "ENGINEERING // DISTRIBUTED SYSTEMS",
    type: "Monograph",
    date: "MAY 2024",
    readTime: "10 MIN READ",
    language: "en",
    excerpt:
      "Architectural blueprints for deploying high-concurrency Next.js applications across distributed edge regions with optimistic cache synchronization.",
    content: `
# ZERO-DOWNTIME MULTI-REGION NEXT.JS ARCHITECTURES FOR HIGH-CONCURRENCY COMMERCE PLATFORMS

### The Problem of Global Latency
When enterprise e-commerce and analytics platforms operate at peak load (exceeding 100,000 requests per second), centralized server rendering causes global latency spikes.

### Architectural Solution:
1. **Edge-First ISR & Streaming SSR**: Utilizing edge functions for initial shell hydration while streaming dynamic personalized payloads asynchronously.
2. **Surrogate Key Invalidation**: Tag-based granular cache purging across distributed edge nodes within milliseconds.
3. **Resilient Data Reconciliation**: Optimistic client-side transactional state backed by distributed key-value stores.
    `,
  },
  {
    slug: "onubad-o-shunnata",
    title: "অনুবাদ ও শূন্যতা",
    category: "LITERATURE & TRANSLATION",
    tag: "ESSAY // LITERARY TRANSLATION",
    type: "Essay",
    date: "APR 2024",
    readTime: "5 MIN READ",
    language: "bn",
    excerpt:
      "দর্শন ও সাহিত্য অনুবাদে মূল ভাষার অন্তরালের নীরবতা ও মেটাফোর অনুবাদের রূপতত্ত্ব নিয়ে একটি সংক্ষিপ্ত আত্মানুসন্ধান।",
    content: `
# অনুবাদ ও শূন্যতা

### শব্দের অন্তরালের স্তব্ধতা
অনুবাদ কেবল এক ভাষার শব্দকে অন্য ভাষার শব্দ দিয়ে প্রতিস্থাপন করা নয়। প্রতিটি শক্তিশালী সাহিত্যের একটি অদৃশ্য শরীর থাকে—যেটি উচ্চারিত শব্দের চেয়ে অনুচ্চারিত ভাবের ওপর বেশি নির্ভর করে।

### অনুবাদের মূল সূত্র:
1. **ছন্দ ও নীরবতা**: বাক্যের মধ্যকার বিরতি এবং স্বরক্ষেপণকে লক্ষ্য ভাষায় বাঁচিয়ে রাখা।
2. **সাংস্কৃতিক রূপান্তর**: রূপকগুলোকে আক্ষরিক অনুবাদ না করে তার অন্তর্নিহিত দার্শনিক ভাবকে পুনর্নির্মাণ করা।
3. **কণ্ঠস্বরের সততা**: লেখকের মূল সুর বিকৃত না করে লক্ষ্য ভাষার স্বাভাবিক প্রবাহ বজায় রাখা।
    `,
  },
  {
    slug: "state-machines-in-frontend",
    title: "স্টেট মেশিন: ফ্রন্টএন্ড আর্কিটেকচারে জটিল লজিক ও বাগ প্রতিরোধের আধুনিক গাণিতিক কৌশল",
    category: "ENGINEERING & CLOUD",
    tag: "ENGINEERING // STATE MACHINES",
    type: "Article",
    date: "MAR 2024",
    readTime: "9 MIN READ",
    language: "bn",
    excerpt:
      "ডিটারমিনিস্টিক ফাইনাইট স্টেট মেশিন ও স্টেটচার্ট ব্যবহার করে জটিল ইউজার ফ্লো ও অ্যাসিনক্রোনাস ডেটা হ্যান্ডলিংয়ের সমাধান।",
    content: `
# স্টেট মেশিন: ফ্রন্টএন্ড আর্কিটেকচারে জটিল লজিক ও বাগ প্রতিরোধের আধুনিক গাণিতিক কৌশল

### প্রচলিত স্টেট ম্যানেজমেন্টের সংকট
React অ্যাপ্লিকেশনে অতিরিক্ত \`useState\` বা \`useEffect\` ব্যবহারের ফলে কোডের অবস্থা অস্পষ্ট হয়ে পড়ে। যাকে আমরা বলি "ইম্পসিবল স্টেট" (যেমন একই সাথে লোডিং এবং এরর উভয়ই ট্রু হওয়া)।

### ফাইনাইট স্টেট মেশিনের সুবিধা:
- **গাণিতিক নিশ্চয়তা**: যেকোনো মুহূর্তে সিস্টেম শুধুমাত্র একটি বৈধ স্টেটে থাকতে পারে।
- **স্বচ্ছ ইভেন্ট ড্রাইভেন ফ্লো**: প্রতিটি ট্রানজিশন পূর্বনির্ধারিত ইভেন্টের মাধ্যমে ঘটে।
- **ডিবাগিং ও ভিজ্যুয়ালাইজেশন**: জটিল UI ফ্লো সহজে চার্ট আকারে দেখা ও টেস্ট করা যায়।
    `,
  },
  {
    slug: "the-craft-of-minimalist-code",
    title: "THE CRAFT OF MINIMALIST CODE",
    category: "THEORETICAL FRAMEWORKS",
    tag: "ESSAY // SOFTWARE DESIGN",
    type: "Essay",
    date: "FEB 2024",
    readTime: "6 MIN READ",
    language: "en",
    excerpt:
      "On intentional software simplicity, eliminating cognitive debt, and preserving architectural clarity over premature cleverness.",
    content: `
# THE CRAFT OF MINIMALIST CODE

### The Illusion of Complexity
In modern software engineering, complexity is frequently mistaken for sophistication. Yet the greatest systems in computing history are characterized by severe restraint, modular minimalism, and zero cognitive debt.

### Core Disciplines:
1. **Delete Before You Refactor**: The fastest code is the code that is never written.
2. **Explicit Over Clever**: Write code that can be reasoned about without keeping ten layers of indirection in human RAM.
3. **Strict Boundaries**: Let modules communicate through clear, narrow protocols.
    `,
  },
  {
    slug: "printed-books-vs-screen-light",
    title: "মুদ্রিত বই বনাম স্ক্রিনের আলো: আধুনিক পাঠাভ্যাস ও ডিজিটাল মনোগ্রামের ভবিষ্যৎ",
    category: "LITERATURE & TRANSLATION",
    tag: "ESSAY // READING CULTURE",
    type: "Monograph",
    date: "JAN 2024",
    readTime: "8 MIN READ",
    language: "bn",
    excerpt:
      "মুদ্রিত টাইপোগ্রাফির স্পর্শ এবং ব্রাউজারের ডিজিটাল এডিটরিয়াল ফরম্যাটে দীর্ঘ পাঠের তুলনামূলক নন্দনতত্ত্ব।",
    content: `
# মুদ্রিত বই বনাম স্ক্রিনের আলো: আধুনিক পাঠাভ্যাস ও ডিজিটাল মনোগ্রামের ভবিষ্যৎ

### পাঠের পরিবর্তনশীল মাধ্যম
কাগজের গন্ধ, পৃষ্ঠার খসখসে অনুভূতি এবং সুইজারল্যান্ডের ক্লাসিক গ্রিড প্রিন্ট ডিজাইন শতাব্দীর পর শতাব্দী ধরে চিন্তাশীল পাঠের সঙ্গী ছিল। ডিজিটাল যুগে এসে ইনফরমেশন ওভারলোড পাঠের গভীরতাকে সংকুচিত করেছে।

### ডিজিটাল মনোগ্রামের লক্ষ্য:
- **ডিস্ট্রাকশন-ফ্রি রিডিং**: পপআপ ও বিজ্ঞাপনের কোলাহলমুক্ত শান্ত পড়ার পরিবেশ তৈরি করা।
- **মুদ্রিত নান্দনিকতা ইন্টারফেসে আনা**: ১ পিক্সেল সূক্ষ্ম লাইন, মার্জিত ফন্ট এবং পর্যাপ্ত নিঃশ্বাস নেওয়ার মতো মার্জিন নিশ্চিত করা।
    `,
  },
];

// Helper functions for easy API route integration / future CMS plugging
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return BLOG_POSTS;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  return BLOG_POSTS.find((post) => post.slug === slug);
};
