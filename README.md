# Abdullah Al Maksud - Developer & Writer Portfolio

A modern, high-performance portfolio and dashboard built with cutting-edge web technologies. Showcasing projects, blog articles, books, and professional analytics with a beautiful, responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🚀 Features

- **Modern Dashboard**: Interactive analytics, activity feeds, and quick actions
- **Portfolio Showcase**: Display projects, blog posts, and books with rich filtering
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Dark/Light Theme**: Built-in theme toggle with `next-themes`
- **Smooth Animations**: Elegant motion effects powered by Framer Motion
- **Performance Optimized**: Lazy-loaded components and optimized images
- **Type Safe**: Full TypeScript support for better development experience
- **Accessible**: Built with accessibility best practices using shadcn/ui components
- **SEO Ready**: Optimized for search engines with Next.js

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [Bun](https://bun.sh/)

## 📋 Project Structure

```
.
├── app/                      # Next.js App Router
│   ├── (dashboard)/          # Dashboard section
│   │   ├── dashboard/        # Overview and main pages
│   │   ├── analytics/        # Analytics page
│   │   ├── blog/             # Blog management
│   │   ├── books/            # Books collection
│   │   ├── messages/         # Messages/inbox
│   │   ├── projects/         # Projects showcase
│   │   └── settings/         # Settings page
│   └── (marketing)/          # Public pages
│       ├── blog/             # Blog listing and articles
│       ├── books/            # Books showcase
│       ├── projects/         # Projects gallery
│       ├── about/            # About page
│       └── page.tsx          # Homepage
├── components/               # Reusable React components
│   ├── brand/                # Brand components (logo)
│   ├── common/               # Shared components (theme toggle, etc.)
│   ├── dashboard/            # Dashboard-specific components
│   ├── marketing/            # Marketing page components
│   └── ui/                   # shadcn/ui base components
├── screens/                  # Page-level components
│   ├── dashboard/            # Dashboard screens
│   └── features/             # Feature screens
├── constants/                # Configuration constants
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
├── providers/                # App providers (themes, etc.)
├── store/                    # Zustand state management
├── types/                    # TypeScript types
└── public/                   # Static assets
```

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AbdullahAlMaksud/AbdullahAlMaksudWeb.git
   cd AbdullahAlMaksudWeb
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start development server**

   ```bash
   bun run dev
   ```

4. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Commands

```bash
# Development
bun run dev              # Start development server with webpack
bun run dev:turbo        # Start with Turbopack (faster, experimental)

# Production
bun run build            # Build for production
bun run start            # Start production server

# Quality
bun run typecheck        # Run TypeScript type checking
bun run lint             # Run ESLint
bun run format           # Format code with Prettier

# Testing
bun run test             # Run tests
```

### Development Notes

The default development script uses webpack with source maps disabled for better performance and lower RAM usage:

```bash
next dev --webpack --disable-source-maps
```

For faster builds (experimental), you can use Turbopack:

```bash
next dev --turbopack
```

## 🎨 Customization

### Site Configuration

Edit `constants/site.ts` to customize:

- Owner name and bio
- Site metadata
- Tech stack display
- Social links

### Mock Data

Modify `constants/mock-data.ts` to update:

- Dashboard analytics data
- Project information
- Blog posts
- Books collection

### Theming

The app uses `next-themes` for dark/light mode support. Customize colors in:

- `app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind configuration

## 🔧 Environment Variables

Create a `.env.local` file (optional):

```env
# Add any external API endpoints or configuration here
```

## 📦 Building for Production

```bash
# Build the application
bun run build

# Start production server
bun run start
```

The production build creates an optimized, minified application ready for deployment.

## 🌐 Deployment

This project is optimized for deployment on:

- **Vercel** (recommended) - One-click deployment
- **Netlify** - Works out of the box
- **Self-hosted** - Use `bun run build && bun run start`

### Deployment on Vercel

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Vercel automatically detects Next.js and deploys

## 📚 Pages

### Public Pages

- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - About page
- **Blog** (`/blog`) - Blog listing with dynamic articles (`/blog/[slug]`)
- **Books** (`/books`) - Books showcase
- **Projects** (`/projects`) - Projects gallery

### Dashboard Pages

- **Overview** (`/dashboard`) - Main dashboard with analytics
- **Analytics** (`/dashboard/analytics`) - Detailed analytics charts
- **Blog** (`/dashboard/blog`) - Blog management
- **Books** (`/dashboard/books`) - Books management
- **Messages** (`/dashboard/messages`) - Inbox/messages
- **Projects** (`/dashboard/projects`) - Projects management
- **Settings** (`/dashboard/settings`) - Dashboard settings

## 🎯 Performance

- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Route-based code splitting automatically
- **Lazy Loading**: Components are lazy-loaded where appropriate
- **Caching**: Optimized caching strategies
- **Bundle Size**: Minimal dependencies for faster load times

## 🔐 Security

- TypeScript for type safety
- ESLint configuration for code quality
- Next.js built-in security features
- No sensitive data in version control

## 📖 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abdullah Al Maksud**

- Portfolio: [abdullahalmaksud.com](https://abdullahalmaksud.com)
- GitHub: [@AbdullahAlMaksud](https://github.com/AbdullahAlMaksud)
- Email: contact@abdullahalmaksud.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - High-quality React components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- All open-source contributors

---

**Last Updated**: May 2026
**Status**: Active Development ✨
