# Code Structure & Convention Rules

## Arrow Functions

- সব জায়গায় arrow function (`const X = () => ...`) ইউজ করো
- `function` declaration ইউজ করো না (API routes ছাড়া)
- Component exports: `export const ComponentName = () => { ... }`
- Page exports: `const Page = () => ...; export default Page;`

## File Size Limit

- প্রতিটি ফাইল সর্বোচ্চ **300 লাইন**
- বড় হলে sub-components তৈরি করে split করো

## App Folder Convention

- `app/` ফোল্ডারে সরাসরি কোনো UI কোড থাকবে না
- শুধু arrow function re-export থাকবে:
  ```tsx
  import { HomeScreen } from "@/screens/HomeScreen";
  const Page = () => <HomeScreen />;
  export default Page;
  ```
- Exception: `layout.tsx` এ metadata ও provider wrapper থাকতে পারে
- Exception: `api/` routes এ server logic থাকবে

## Screens Pattern

- সব পেজের UI কোড `src/screens/` ফোল্ডারে থাকবে
- Sub-components: `src/screens/<page-name>/ComponentName.tsx`
- Screen components arrow function export করবে

## UI Components

- shadcn/ui components ইউজ করতে হবে (Button, Input, Textarea, Select, Dialog, etc.)
- Raw `<input>`, `<textarea>` ইউজ করো না — shadcn `Input`, `Textarea` ইউজ করো

## Smooth Scrolling

- Lenis smooth scroll ইন্টিগ্রেটেড আছে `LenisProvider` দিয়ে
- Scrollbar: কালো, 2px (WebKit + Firefox)

## Data Layer & Types

- সব স্ট্যাটিক ও ডায়নামিক ডাটা `src/data/` ফোল্ডারে থাকবে
- সব TypeScript interface ও types `src/types/` ফোল্ডারে থাকবে

## Code Formatting & Quality Tooling

- **Prettier**: Automatic code formatting with `prettier-plugin-tailwindcss` for class sorting
- **Husky & lint-staged**: Pre-commit hooks automatically format and lint staged files
- **Commitlint**: Enforces conventional commits format (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, etc.)
- **Validation**: Run `pnpm validate` to check both ESLint and Prettier formatting
