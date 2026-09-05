# API Requirements Specification (PRD & Technical Contract)

**Project:** Abdullah Al Maksud — Editorial Portfolio, Monograph Publication & Engineering Advisory Platform  
**Target Stack:** Next.js 16 (App Router), TypeScript, REST / Route Handlers, Resend API, Headless CMS / Relational Database (PostgreSQL / SQLite / Edge DB)  
**Document Version:** 2.0.0  
**Status:** Approved & Comprehensive Specification

---

## 1. Executive Summary & Architecture

This document defines the complete functional and technical specifications for the backend API services powering the **Abdullah Al Maksud** web platform.

The website operates as an editorial broadsheet portfolio, high-density engineering showcase, publication repository (essays, monographs, translated works, books), and strategic advisory gateway.

### 1.1 Architectural Pattern

- **API Style:** RESTful JSON APIs adhering to resource-oriented conventions.
- **Runtime Target:** Next.js Route Handlers (`src/app/api/.../route.ts`), fully compatible with Serverless and Node.js runtimes.
- **Client Consumption:** Next.js Server Components with Incremental Static Regeneration (ISR) and React 19 Client Components for interactive workflows.
- **Persistence Layer:** Relational DB (PostgreSQL / SQLite via Prisma/Drizzle) or Headless CMS, with fallback to deterministic local datasets.

### 1.2 Core Architectural Principles

1. **Type-Safe Contract:** All request bodies, query params, and response envelopes strictly adhere to shared TypeScript interfaces.
2. **Deterministic Response Envelope:** Standardized JSON wrapper for all 2xx success and 4xx/5xx error responses.
3. **Graceful Degradation & Fail-Safe Mode:** If downstream services (e.g. email dispatcher, external databases) are unavailable or unconfigured, endpoints fall back gracefully without unhandled exceptions.
4. **Optimized for Edge Caching & ISR:** GET endpoints support `ETag`, `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`, and on-demand revalidation tags.

---

## 2. Authentication, Authorization & Security

### 2.1 Access Levels

| Role            | Access Scope                                                                                  | Mechanism                                                           |
| :-------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| **Public**      | Read-only access to published content (Blogs, Books, Projects, Metadata) and inquiry dispatch | None / CORS-restricted / Rate-limited                               |
| **Admin / CMS** | Full CRUD access to content, inquiries, settings, and media uploads                           | `Authorization: Bearer <JWT_TOKEN>` or `x-api-key: <ADMIN_API_KEY>` |

### 2.2 Security Standards

- **Rate Limiting:** IP-based sliding window rate limiting for write operations (e.g., 5 requests / 10 mins for contact form).
- **Spam Protection:** Honeypot field and optional Cloudflare Turnstile verification for contact and newsletter submissions.
- **Payload Sanitization:** Strict string trimming, length bounds, email format validation (RFC 5322), and HTML sanitization to prevent XSS.
- **Security Headers:** Enforced `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 3. Global Request & Response Specifications

### 3.1 Standard Success Envelope

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": { ... },
  "meta": {
    "timestamp": "2026-08-26T10:00:00.000Z",
    "version": "v1",
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 24,
      "totalPages": 3,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### 3.2 Standard Error Envelope

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request payload failed validation.",
    "details": [
      {
        "field": "email",
        "issue": "Please enter a valid email address."
      }
    ]
  },
  "meta": {
    "timestamp": "2026-08-26T10:00:00.000Z",
    "path": "/api/v1/contact/send"
  }
}
```

### 3.3 HTTP Status Code Mapping

| Status Code          | Reason Phrase         | Use Case                                                  |
| :------------------- | :-------------------- | :-------------------------------------------------------- |
| `200 OK`             | OK                    | Successful GET requests, inquiry dispatch, updates        |
| `201 Created`        | Created               | Successfully created resources (blog post, book, project) |
| `400 Bad Request`    | Bad Request           | Missing required parameters, invalid JSON syntax          |
| `401 Unauthorized`   | Unauthorized          | Missing or expired Admin Bearer token                     |
| `403 Forbidden`      | Forbidden             | Insufficient permissions or invalid API key               |
| `404 Not Found`      | Not Found             | Slug, ID, or resource does not exist                      |
| `422 Unprocessable`  | Unprocessable Entity  | Business logic validation failure (e.g. duplicate slug)   |
| `429 Too Many Req`   | Too Many Requests     | Rate limit exceeded                                       |
| `500 Internal Error` | Internal Server Error | Uncaught server exception or downstream service outage    |

---

## 4. API Endpoints Specification Matrix

### Module 1: Site Metadata & Global Identity

#### 1.1 Get Global Site Configuration

- **Endpoint:** `GET /api/v1/site/metadata`
- **Access:** Public
- **Description:** Supplies site-wide parameters including masthead folio numbers, live badge title, vertical labels, social media profiles, and copyright info.
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "meta": {
      "issue": "ISSUE 01",
      "folio": "FOLIO 001",
      "badge": "PORTFOLIO",
      "verticalLabel": "INDEX — VOL. I"
    },
    "footer": {
      "copyright": "© 2026 ABDULLAH AL MAKSUD",
      "rights": "ALL RIGHTS RESERVED",
      "socials": [
        { "label": "GITHUB", "url": "https://github.com/abdullahalmaksud", "isExternal": true },
        {
          "label": "LINKEDIN",
          "url": "https://linkedin.com/in/abdullahalmaksud",
          "isExternal": true
        },
        { "label": "TWITTER", "url": "https://twitter.com/almaksud_", "isExternal": true },
        { "label": "EMAIL", "url": "mailto:contact@abdullahalmaksud.com", "isExternal": true }
      ]
    }
  }
}
```

#### 1.2 Get Identity & Biography Details

- **Endpoint:** `GET /api/v1/identity`
- **Access:** Public
- **Description:** Returns primary personal identity attributes, titles, consultation summary, core disciplines, and CV download asset paths.
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "name": "ABDULLAH AL MAKSUD",
    "role": "FRONTEND ENGINEER",
    "subRole": "ANALYZE · DESIGN · DEVELOP",
    "cvUrl": "/CV-of-Abdullah-Al-Maksud.pdf",
    "consultation": {
      "tag": "STRATEGIC INQUIRY",
      "headline": "TECHNICAL ADVISORY & ARCHITECTURAL CONSULTATION",
      "offerings": [
        {
          "label": "WEB ARCHITECTURE",
          "category": "ENGINEERING",
          "description": "High-throughput React/Next.js systems."
        },
        {
          "label": "LITERARY TRANSLATION",
          "category": "LANGUAGE",
          "description": "Technical & philosophical manuscripts."
        }
      ],
      "ctaText": "INITIATE CONSULTATION"
    },
    "disciplines": [
      { "id": "01", "name": "FRONTEND ENGINEERING", "description": "Web Systems & Architecture" },
      {
        "id": "02",
        "name": "WRITING & TRANSLATION",
        "description": "Literary & Technical Translation"
      },
      { "id": "03", "name": "SYSTEMS & DESIGN", "description": "High-Density Data Interfaces" }
    ]
  }
}
```

---

### Module 2: Hero Visual & Media Banner

#### 2.1 Get Hero Banner Media Config

- **Endpoint:** `GET /api/v1/hero-banner`
- **Access:** Public
- **Description:** Retrieves the active Hero Banner configuration (video or architectural still image, vertical label, and autoplay constraints).
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "mediaType": "video",
    "videoUrl": "/header.mp4",
    "fallbackImageUrl": "/images/hero-banner.jpg",
    "alt": "Architectural Technology Monograph Visual",
    "verticalLabel": "INDEX — VOL. I",
    "playbackOptions": {
      "autoPlay": true,
      "loop": true,
      "muted": true,
      "playsInline": true,
      "disablePictureInPicture": true
    }
  }
}
```

#### 2.2 Update Hero Banner Config (Admin)

- **Endpoint:** `PUT /api/v1/admin/hero-banner`
- **Access:** Admin (Bearer Token)
- **Payload:**

```json
{
  "mediaType": "video",
  "videoUrl": "/header.mp4",
  "verticalLabel": "INDEX — VOL. I"
}
```

---

### Module 3: Enterprise Architecture Projects

#### 3.1 List Enterprise Projects

- **Endpoint:** `GET /api/v1/projects`
- **Access:** Public
- **Query Parameters:**
  - `category` (string, optional): Filter by category.
  - `tag` (string, optional): Filter by tag.
  - `page` (number, optional, default: `1`): Pagination page.
  - `limit` (number, optional, default: `10`): Items per page.
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "category": "SECTION 01 // ARCHITECTURAL DIRECTORY",
    "titleLine1": "ENTERPRISE ARCHITECTURE",
    "titleLine2": "SYSTEM CATALOGUE",
    "items": [
      {
        "id": "SYS-01",
        "tag": "DETERMINISTIC STATE PIPELINE",
        "title": "Aeronautical Telemetry Visualizer",
        "description": "Sub-frame latency data stream engine rendering multi-axis sensor arrays.",
        "techStack": ["React 19", "TypeScript", "Web Workers", "Canvas API"],
        "metrics": ["< 16ms render loop", "Zero GC overhead", "60 FPS steady"]
      },
      {
        "id": "SYS-02",
        "tag": "EDGE DISTRIBUTED FRONTEND",
        "title": "Multi-Region Monograph Engine",
        "description": "Next.js App Router publication network utilizing Edge SSR.",
        "techStack": ["Next.js", "Tailwind CSS", "Edge Functions"],
        "metrics": ["Global TTFB < 50ms", "100% Lighthouse Performance"]
      }
    ]
  }
}
```

#### 3.2 Get Single Project By ID

- **Endpoint:** `GET /api/v1/projects/:id`
- **Access:** Public
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "id": "SYS-01",
    "tag": "DETERMINISTIC STATE PIPELINE",
    "title": "Aeronautical Telemetry Visualizer",
    "description": "Sub-frame latency data stream engine rendering multi-axis sensor arrays.",
    "fullContent": "### System Architecture Breakdown\n\nDetailed breakdown of worker thread pipelines...",
    "techStack": ["React 19", "TypeScript", "Web Workers", "Canvas API"],
    "metrics": ["< 16ms render loop", "Zero GC overhead"]
  }
}
```

#### 3.3 Create / Update Project (Admin)

- **Endpoints:** `POST /api/v1/admin/projects`, `PUT /api/v1/admin/projects/:id`, `DELETE /api/v1/admin/projects/:id`

---

### Module 4: Literature, Essays & Monographs (Blog Engine)

#### 4.1 List Monographs / Blog Posts

- **Endpoint:** `GET /api/v1/blog/posts`
- **Access:** Public
- **Query Parameters:**
  - `language` (`en` | `bn` | `all`, default: `all`)
  - `type` (`Essay` | `Article` | `Monograph` | `Publication`, optional)
  - `category` (string, optional)
  - `search` (string, optional): Full-text search on title, excerpt, and content.
  - `page` (number, default: `1`)
  - `limit` (number, default: `10`)
  - `sort` (`newest` | `oldest` | `readTime`, default: `newest`)
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "slug": "thermodynamics-in-state",
        "title": "STATE THERMODYNAMICS",
        "category": "THEORETICAL FRAMEWORKS",
        "tag": "ESSAY // ARCHITECTURE",
        "type": "Essay",
        "date": "AUG 2024",
        "readTime": "8 MIN READ",
        "language": "en",
        "excerpt": "An analytical exploration of parallels between physical entropy and software complexity."
      },
      {
        "slug": "bengali-typography-digital-era",
        "title": "ডিজিটাল ইন্টারফেসে বাংলা টাইপোগ্রাফির নান্দনিক ব্যাকরণ",
        "category": "TYPOGRAPHY & DESIGN",
        "tag": "MONOGRAPH // TYPOGRAPHY",
        "type": "Monograph",
        "date": "MAY 2024",
        "readTime": "15 MIN READ",
        "language": "bn",
        "excerpt": "ওয়েব ও মোবাইল ইন্টারফেসে বাংলা হরফের দৃশ্যমান শৃঙ্খলা..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 8,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

#### 4.2 Get Single Monograph by Slug

- **Endpoint:** `GET /api/v1/blog/posts/:slug`
- **Access:** Public
- **Parameters:** `slug` (string, required)
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "slug": "thermodynamics-in-state",
    "title": "STATE THERMODYNAMICS",
    "category": "THEORETICAL FRAMEWORKS",
    "tag": "ESSAY // ARCHITECTURE",
    "type": "Essay",
    "date": "AUG 2024",
    "readTime": "8 MIN READ",
    "language": "en",
    "excerpt": "An analytical exploration of parallels between physical entropy and software complexity.",
    "content": "# STATE THERMODYNAMICS\n\n### The Law of Architectural Entropy\nIn closed systems, entropy naturally increases...",
    "relatedPosts": [
      {
        "slug": "the-logic-of-ui",
        "title": "THE LOGIC OF UI",
        "category": "AESTHETIC PARADIGMS"
      }
    ]
  }
}
```

- **Response (`404 Not Found`):**

```json
{
  "success": false,
  "error": {
    "code": "POST_NOT_FOUND",
    "message": "Monograph with slug 'unknown-slug' was not found."
  }
}
```

#### 4.3 Get Blog Categories with Counts

- **Endpoint:** `GET /api/v1/blog/categories`
- **Access:** Public
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": [
    { "name": "THEORETICAL FRAMEWORKS", "count": 3 },
    { "name": "AESTHETIC PARADIGMS", "count": 2 },
    { "name": "TYPOGRAPHY & DESIGN", "count": 3 }
  ]
}
```

#### 4.4 Create / Edit / Delete Post (Admin)

- **Endpoints:**
  - `POST /api/v1/admin/blog/posts` (Create)
  - `PUT /api/v1/admin/blog/posts/:slug` (Update)
  - `DELETE /api/v1/admin/blog/posts/:slug` (Delete)
- **Validation Rules:**
  - `title`: String, min 3 chars, max 200 chars.
  - `slug`: String, lowercase regex `/^[a-z0-9-]+$/`, unique across posts.
  - `content`: Markdown string, min 50 chars.
  - `type`: Enum `["Essay", "Article", "Monograph", "Publication"]`.
  - `language`: Enum `["en", "bn"]`.

---

### Module 5: Books & Literary Publications

#### 5.1 List Published Books

- **Endpoint:** `GET /api/v1/books`
- **Access:** Public
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "slug": "emon-jodi-hoto",
        "title": "এমন যদি হতো",
        "subtitle": "মহাজাগতিক একাকীত্ব ও মানবিক অনুভূতির কল্পবিজ্ঞান আখ্যান",
        "author": "আব্দুল্লাহ আল মাকসুদ",
        "coverImage": "/images/image.png",
        "category": "LITERATURE & FICTION",
        "genre": "কল্পবিজ্ঞান ও দার্শনিক রূপক (Sci-Fi & Philosophical Fiction)",
        "language": "বাংলা",
        "publicationYear": "২০২৪",
        "edition": "১ম প্রকাশ",
        "pages": 128,
        "publisher": "ঐতিহ্য প্রকাশনী",
        "isbn": "978-984-776-120-4"
      }
    ]
  }
}
```

#### 5.2 Get Book Details by Slug

- **Endpoint:** `GET /api/v1/books/:slug`
- **Access:** Public
- **Description:** Returns the complete book profile including synopsis, philosophical themes, chapter outlines, literary quotes, author note, and authorized distributor links.
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "slug": "emon-jodi-hoto",
    "title": "এমন যদি হতো",
    "subtitle": "মহাজাগতিক একাকীত্ব ও মানবিক অনুভূতির কল্পবিজ্ঞান আখ্যান",
    "author": "আব্দুল্লাহ আল মাকসুদ",
    "coverImage": "/images/image.png",
    "category": "LITERATURE & FICTION",
    "genre": "কল্পবিজ্ঞান ও দার্শনিক রূপক",
    "language": "বাংলা",
    "publicationYear": "২০২৪",
    "edition": "১ম প্রকাশ",
    "pages": 128,
    "publisher": "ঐতিহ্য প্রকাশনী",
    "isbn": "978-984-776-120-4",
    "synopsis": "\"এমন যদি হতো\" কেবল একটি কল্পবিজ্ঞান গল্পগ্রন্থ নয়, এটি মানুষের অবচেতন মন ও মহাজাগতিক বাস্তবতার মধ্যকার এক অদৃশ্য কাব্যিক সেতু...",
    "themes": [
      "সময় ও অস্তিত্বের রূপক (Temporal Paradox & Existentialism)",
      "প্রযুক্তি ও একাকীত্ব (Cosmic Isolation & Emotional Resonance)",
      "সমান্তরাল বাস্তবতা ও অনুভূতির টান (Parallel Dimensions of Love)"
    ],
    "chapters": [
      {
        "number": "০১",
        "title": "চাঁদের অন্ধকার পৃষ্ঠের গান",
        "description": "মহাকাশযানের মৃদু গুঞ্জনের ভেতর একাকী নভোচারীর স্মৃতি রোমন্থন।"
      },
      {
        "number": "০২",
        "title": "সমান্তরাল বৃত্তের দূরত্ব",
        "description": "যদি প্রতিটা সিদ্ধান্তের পর মহাবিশ্ব দুটি ভিন্ন ধারায় বিভক্ত হয়ে যায়..."
      }
    ],
    "quotes": [
      "বিজ্ঞান আমাদের উত্তর দেয় 'কীভাবে', কিন্তু সাহিত্য অনুসন্ধান করে 'কেন'।",
      "মহাশূন্যের শূন্যতা ততটা গভীর নয়, যতটা গভীর একজন মানুষের হৃদয়ের নিঃসঙ্গতা।"
    ],
    "authorNote": "কল্পবিজ্ঞানকে আমরা অনেক সময় কেবল রোবট, এলিয়েন কিংবা হাইপারড্রাইভ স্পেসশিপের কাঠামোতে আটকে ফেলি...",
    "purchaseLinks": [
      {
        "label": "রকমারি থেকে সংগ্রহ করুন",
        "url": "https://www.rokomari.com/book/439775/emon-jodi-hoto",
        "isPrimary": true
      },
      { "label": "বাতিঘর", "url": "https://baatighar.com/book/emon-jodi-hoto", "isPrimary": false }
    ]
  }
}
```

---

### Module 6: Design Systems & Visualizer Modules

#### 6.1 Get Design System Catalog

- **Endpoint:** `GET /api/v1/design-systems`
- **Access:** Public
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "category": "SECTION 03 // VISUAL ARCHITECTURE",
    "title": "DESIGN SYSTEMS & VISUALIZERS",
    "modules": [
      {
        "id": "DS-01",
        "tag": "VISUALIZER",
        "title": "Deterministic Color Engine",
        "description": "High-contrast perceptually uniform HSL color distribution engine.",
        "type": "interactive",
        "isInteractive": true,
        "details": {
          "overview": "Algorithmic token engine guaranteeing WCAG AAA contrast ratios.",
          "keyPoints": [
            "Mathematical luminance calculation",
            "Zero-runtime CSS variable projection",
            "Full dark/light mode parity"
          ]
        }
      },
      {
        "id": "DS-02",
        "tag": "FRAMEWORK",
        "title": "Broadsheet Newspaper Grid",
        "description": "Fluid mathematical multi-column broadsheet layout system.",
        "type": "article",
        "isInteractive": false
      }
    ]
  }
}
```

---

### Module 7: Strategic Advisory & Consultations

#### 7.1 Get Strategic Advisory Details

- **Endpoint:** `GET /api/v1/advisory`
- **Access:** Public
- **Response (`200 OK`):**

```json
{
  "success": true,
  "data": {
    "badge": "STRATEGIC ADVISORY",
    "availability": "ACCEPTING SELECT ENGAGEMENTS",
    "category": "SECTION 04 // EXECUTIVE PRACTICE",
    "headline": "TECHNICAL ADVISORY & ARCHITECTURAL CONSULTATION",
    "statement": "Providing senior architectural guidance for high-growth technology companies.",
    "pillars": [
      {
        "number": "01",
        "title": "SYSTEM ARCHITECTURE AUDIT",
        "description": "In-depth code and performance analysis."
      },
      {
        "number": "02",
        "title": "DESIGN SYSTEM GOVERNANCE",
        "description": "Establishing resilient design tokens."
      },
      {
        "number": "03",
        "title": "SCALING & PERFORMANCE OPTIMIZATION",
        "description": "Sub-second load times and Edge deployment."
      }
    ],
    "cta": {
      "primaryText": "INITIATE ADVISORY ENGAGEMENT",
      "secondaryText": "SCHEDULE INITIAL 30-MINUTE DISCOVERY CALL",
      "email": "contact@abdullahalmaksud.com"
    }
  }
}
```

---

### Module 8: Direct Contact & Inquiry Dispatch

#### 8.1 Dispatch Inquiry Email (`POST /api/send-email` or `/api/v1/contact/send`)

- **Endpoint:** `POST /api/send-email`
- **Access:** Public (Rate Limited: Max 5 submissions / 10 min per IP)
- **Headers:** `Content-Type: application/json`
- **Request Body:**

```json
{
  "name": "Sarah Jenkins",
  "email": "s.jenkins@enterprise-tech.io",
  "subject": "Strategic Architecture Advisory",
  "message": "We are planning to refactor our multi-tenant dashboard and would like to retain your architectural consultation services for Q4."
}
```

#### Field Validation Rules:

| Field     | Type   | Required | Constraints                                                                                                                                                                                   |
| :-------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`    | String | Yes      | Trimmed, min 2, max 100 characters. No script tags.                                                                                                                                           |
| `email`   | String | Yes      | Valid email matching `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Max 150 characters.                                                                                                                      |
| `subject` | String | Yes      | Min 3, max 150 characters. Supported quick subjects: `"Literary & Technical Translation"`, `"Product & Design Systems"`, `"Web & Mobile App Solutions"`, `"Strategic Architecture Advisory"`. |
| `message` | String | Yes      | Min 10, max 4000 characters. Sanitized text.                                                                                                                                                  |

#### Success Response (`200 OK` — Resend Connected):

```json
{
  "success": true,
  "message": "Email sent successfully!",
  "data": {
    "id": "re_abc123456789",
    "timestamp": "2026-08-26T10:00:00.000Z"
  }
}
```

#### Simulation Mode Response (`200 OK` — No `RESEND_API_KEY` present):

```json
{
  "success": true,
  "message": "Inquiry received successfully! (Simulated mode: Add RESEND_API_KEY to your .env to send real emails)",
  "simulated": true
}
```

#### Error Responses:

- **400 Bad Request (Missing Required Fields):**

```json
{
  "success": false,
  "error": "All fields (name, email, subject, message) are required."
}
```

- **400 Bad Request (Invalid Email Format):**

```json
{
  "success": false,
  "error": "Please enter a valid email address."
}
```

- **429 Too Many Requests (Rate Limit Triggered):**

```json
{
  "success": false,
  "error": "Too many inquiry requests. Please wait 10 minutes before submitting again."
}
```

- **500 Internal Server Error (Resend Delivery Failure):**

```json
{
  "success": false,
  "error": "Failed to send email via Resend upstream service."
}
```

#### 8.2 Inquiries Management (Admin)

- **Endpoints:**
  - `GET /api/v1/admin/inquiries` (List received contact requests with status filter: `unread`, `contacted`, `archived`)
  - `PATCH /api/v1/admin/inquiries/:id/status` (Update status)

---

### Module 9: Newsletter & Monograph Subscription

#### 9.1 Subscribe to Monographs & Essays

- **Endpoint:** `POST /api/v1/newsletter/subscribe`
- **Access:** Public (Rate Limited: Max 3 submissions / hour per IP)
- **Request Body:**

```json
{
  "email": "reader@literary-journal.org",
  "preferredLanguage": "all"
}
```

- **Supported `preferredLanguage` values:** `"en"` | `"bn"` | `"all"`.
- **Response (`201 Created`):**

```json
{
  "success": true,
  "message": "Subscription confirmed. You will receive new essays and monographs.",
  "data": {
    "email": "reader@literary-journal.org",
    "status": "ACTIVE"
  }
}
```

---

### Module 10: Cache Invalidation & On-Demand Revalidation

#### 10.1 Trigger Next.js Revalidation

- **Endpoint:** `POST /api/revalidate`
- **Access:** Admin / Webhook (Protected by `secret`)
- **Query / Body:**

```json
{
  "secret": "REVALIDATION_TOKEN_XYZ",
  "tag": "blog",
  "path": "/blog"
}
```

- **Execution Logic:**
  - Validates `secret === process.env.REVALIDATION_SECRET`.
  - Calls Next.js `revalidateTag(tag)` or `revalidatePath(path)`.
- **Response (`200 OK`):**

```json
{
  "revalidated": true,
  "tag": "blog",
  "path": "/blog",
  "timestamp": "2026-08-26T10:00:00.000Z"
}
```

---

## 5. TypeScript Data Contracts (Shared Library)

Below are the canonical TypeScript contracts for client and server implementation:

```typescript
// ==========================================
// Meta & Social
// ==========================================
export interface SocialLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface SiteMeta {
  issue: string;
  folio: string;
  badge: string;
  verticalLabel: string;
}

// ==========================================
// Blog & Monographs
// ==========================================
export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  tag: string;
  type: "Essay" | "Article" | "Monograph" | "Publication";
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  language?: "en" | "bn";
  relatedPosts?: Array<Pick<BlogPost, "slug" | "title" | "category">>;
}

// ==========================================
// Books & Literary Publications
// ==========================================
export interface BookChapter {
  number: string;
  title: string;
  description: string;
}

export interface BookPublication {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  coverImage: string;
  category: string;
  genre: string;
  language: string;
  publicationYear: string;
  edition: string;
  pages: number;
  publisher?: string;
  isbn?: string;
  synopsis: string;
  themes: string[];
  chapters?: BookChapter[];
  authorNote?: string;
  quotes?: string[];
  purchaseLinks?: Array<{
    label: string;
    url: string;
    isPrimary?: boolean;
  }>;
}

// ==========================================
// Enterprise Projects & Design Systems
// ==========================================
export interface EnterpriseProject {
  id: string;
  tag: string;
  title: string;
  description: string;
  fullContent?: string;
  techStack?: string[];
  metrics?: string[];
}

export interface DesignSystemModule {
  id: string;
  tag: string;
  title: string;
  description: string;
  isInteractive?: boolean;
  type: "interactive" | "article" | "standard";
  details?: {
    overview?: string;
    keyPoints?: string[];
  };
}

// ==========================================
// Contact & Advisory
// ==========================================
export interface SendEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface StrategicPillar {
  number: string;
  title: string;
  description: string;
}

export interface StrategicAdvisory {
  badge: string;
  availability: string;
  category: string;
  headline: string;
  statement: string;
  pillars: StrategicPillar[];
  cta: {
    primaryText: string;
    secondaryText: string;
    email: string;
  };
}
```

---

## 6. Environment Variables Configuration Matrix

| Variable                   | Required                  | Scope         | Description                                                                |
| :------------------------- | :------------------------ | :------------ | :------------------------------------------------------------------------- |
| `RESEND_API_KEY`           | Optional (Safe Fallback)  | Server        | Resend email API key for sending live contact inquiries.                   |
| `CONTACT_RECIPIENT_EMAIL`  | Optional                  | Server        | Target address for inquiries (defaults to `contact@abdullahalmaksud.com`). |
| `DATABASE_URL`             | Optional (Dynamic CMS)    | Server        | PostgreSQL/MySQL connection string for persistence.                        |
| `ADMIN_API_KEY`            | Optional (CMS endpoints)  | Server        | Secret bearer token for admin CRUD operations.                             |
| `REVALIDATION_SECRET`      | Required for ISR Webhooks | Server        | Secret token authorizing on-demand cache invalidation.                     |
| `NEXT_PUBLIC_SITE_URL`     | Optional                  | Client/Server | Canonical domain (e.g. `https://abdullahalmaksud.com`).                    |
| `NEXT_PUBLIC_API_BASE_URL` | Optional                  | Client        | Base URL for remote API microservices if decoupled.                        |

---

## 7. Next Steps & Implementation Roadmap

1. **Phase 1 (Completed):** Contact dispatch with Resend and simulation fallback (`/api/send-email`).
2. **Phase 2 (Recommended Next):** Dynamic Route Handlers for Blog (`/api/blogs`, `/api/blogs/[slug]`) and Books (`/api/books`, `/api/books/[slug]`) referencing centralized data contracts.
3. **Phase 3:** On-demand ISR revalidation webhook (`/api/revalidate`) for real-time editorial updates without full application redeployment.
4. **Phase 4:** Headless CMS integration (Strapi, Sanity, or custom Postgres schema) with Admin authentication.
