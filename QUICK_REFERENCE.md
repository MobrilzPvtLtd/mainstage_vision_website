# MainStage Vision - Quick Reference Guide

## 🚀 Getting Started

### Running the Application

```bash
# Development server
npm run dev

# Access URLs
Public Site: http://localhost:3000
Admin Panel: http://localhost:3000/admin
```

### Project Structure

```
mainstage-vision/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── nieuws/page.tsx           # News page
│   ├── albums/page.tsx           # Photo albums
│   ├── videos/page.tsx           # Videos
│   ├── events/page.tsx           # Events
│   ├── artiesten/page.tsx        # Artists
│   ├── admin/                    # Admin panel
│   │   ├── page.tsx              # ✅ Dashboard
│   │   └── json-ingestion/
│   │       └── page.tsx          # ✅ JSON Ingestion
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── navigation.tsx            # Public nav
│   ├── footer.tsx                # Public footer
│   ├── admin/
│   │   └── admin-layout-wrapper.tsx  # Reusable admin layout
│   └── ui/                       # shadcn/ui components
├── middleware.ts                 # Auth middleware (currently disabled)
├── ADMIN_IMPLEMENTATION_PLAN.md  # Full roadmap
├── ADMIN_PROGRESS_REPORT.md      # Current status
└── README.md                     # Public site docs
```

## 🎨 Design System

### Brand Colors

```css
/* Primary Colors */
--mainstage-dark: #15171e;      /* Dark Navy Background */
--mainstage-pink: #e91e63;      /* Pink Accent */
--mainstage-light-bg: #f9f9f9;  /* Light Gray Background */

/* Usage in Tailwind */
bg-[#15171e]    /* Dark background */
text-[#e91e63]  /* Pink text */
bg-[#f9f9f9]    /* Light background */
```

### Typography

```typescript
// Font: Montserrat (loaded in layout.tsx)
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
```

### Component Patterns

#### Admin Page Template

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use AdminLayoutWrapper for consistent layout */}
      <AdminLayoutWrapper>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Page Title
        </h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Section Title</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Content here */}
          </CardContent>
        </Card>
      </AdminLayoutWrapper>
    </div>
  );
}
```

#### Button Variants

```tsx
// Primary (Pink)
<Button className="bg-[#e91e63] hover:bg-[#c2185b]">
  Primary Action
</Button>

// Outline
<Button variant="outline">
  Secondary Action
</Button>

// Ghost
<Button variant="ghost">
  Tertiary Action
</Button>
```

#### Badge Variants

```tsx
// Success (Green)
<Badge className="bg-green-500 hover:bg-green-600">
  SUCCESS
</Badge>

// Error (Red)
<Badge className="bg-red-500 hover:bg-red-600">
  FAILED
</Badge>

// Outline
<Badge variant="outline">
  Ready
</Badge>
```

## 📋 Admin Panel Pages

### ✅ Completed Pages

#### 1. Dashboard (`/admin`)
- JSON Ingestion Status Widget
- Quick Stats (Events, Photos, Videos, News)
- Recent Import Failures Table
- Quick Actions

#### 2. JSON Ingestion (`/admin/json-ingestion`)
- Last Import Summary
- Files Detected (events.json, photos.json, videos.json)
- Import Logs Table
- Run Import / View Logs buttons

### 🚧 To Be Built

#### 3. Events (`/admin/events`)
```typescript
// Features needed:
- Search and filter
- Table with: Title, Artist, Date, Status, #Photos, #Videos
- Edit button for each event
- "+ Create Event Metadata" floating button
```

#### 4. Event Edit (`/admin/events/[id]`)
```typescript
// Tabs needed:
- Basic Details (Title, Artist, Date, Location, Description)
- SEO (Meta Title, Meta Description, Slug)
- Linked Media (Read-only photos/videos from JSON)
- Publish (Status, Featured toggle)
```

#### 5. Media Library (`/admin/media`)
```typescript
// Features needed:
- Photos tab (grid view, read-only)
- Videos tab (table view, read-only)
- Right panel preview on click
- Event filter
```

#### 6. News (`/admin/news`)
```typescript
// Features needed:
- News list with search
- "+ Create News" button
- Edit/Delete actions
```

#### 7. News Editor (`/admin/news/create`, `/admin/news/[id]`)
```typescript
// Features needed:
- Rich text editor (TipTap)
- Image upload
- Event linking dropdown
- Tag management
- SEO fields
- Save Draft / Publish buttons
```

#### 8. Ad Management (`/admin/ads`)
```typescript
// Features needed:
- Ad zones list
- Edit zone (Name, Placement, AdSense code, Active toggle)
```

#### 9. Users (`/admin/users`)
```typescript
// Features needed (Super Admin only):
- Users table
- Add/Edit user form
- Role assignment (Super Admin / Editor)
- Active/Inactive toggle
```

#### 10. Settings (`/admin/settings`)
```typescript
// Sections needed:
- General (Site Title, Tagline)
- SEO Defaults
- Schema Version
- Cache Management
- Backup (Super Admin only)
```

#### 11. Audit Logs (`/admin/audit-logs`)
```typescript
// Features needed:
- Logs table (User, Action, Entity, ID, Time)
- Filters (User, Action type, Date range)
```

## 🔐 Authentication Setup (Next Step)

### Install NextAuth.js

```bash
npm install next-auth @next-auth/prisma-adapter
npm install @prisma/client
npm install -D prisma
```

### Create Auth Config

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Implement user authentication logic
        // Check against database
        // Return user object if valid
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Re-enable Middleware

```typescript
// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    
    // Check role-based access
    if (req.nextUrl.pathname.startsWith("/admin/users") && 
        token.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
```

## 🗄️ Database Setup

### Initialize Prisma

```bash
npx prisma init
```

### Update Schema

Copy the complete schema from `ADMIN_IMPLEMENTATION_PLAN.md` to `prisma/schema.prisma`

### Run Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npx prisma studio        # Open Prisma Studio
npx prisma migrate dev   # Run migrations
npx prisma generate      # Generate Prisma Client

# Code Quality
npm run lint             # Run ESLint
```

## 📦 Key Dependencies

```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "tailwindcss": "^4.0.0",
  "next-auth": "^4.24.0",
  "@prisma/client": "^5.0.0",
  "lucide-react": "^0.400.0"
}
```

## 🎯 Implementation Checklist

### Phase 1: Foundation ✅
- [x] Public website (all pages)
- [x] Admin dashboard
- [x] JSON ingestion module
- [x] Admin layout wrapper component

### Phase 2: Authentication 🚧
- [ ] Install NextAuth.js
- [ ] Create login page
- [ ] Set up Prisma
- [ ] Implement role-based access
- [ ] Re-enable middleware

### Phase 3: Core Modules 📋
- [ ] Events management
- [ ] Media library (read-only)
- [ ] News management
- [ ] Rich text editor

### Phase 4: Additional Features 📋
- [ ] Ad management
- [ ] User management
- [ ] Settings page
- [ ] Audit logs

### Phase 5: Polish & Testing 📋
- [ ] Error handling
- [ ] Form validation
- [ ] Responsive design testing
- [ ] Performance optimization

## 💡 Tips & Best Practices

1. **Use Server Components**: Default to Server Components, only use "use client" when needed (forms, interactivity)

2. **Consistent Styling**: Always use the pink accent (#e91e63) for primary actions and active states

3. **Reusable Components**: Use `AdminLayoutWrapper` for all admin pages to maintain consistency

4. **Type Safety**: Define TypeScript interfaces for all data structures

5. **Error Handling**: Always handle errors gracefully with user-friendly messages

6. **Accessibility**: Use semantic HTML and ARIA labels where appropriate

7. **Performance**: Use Next.js Image component for all images

8. **Security**: Never expose sensitive data, always validate on server-side

## 📞 Quick Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Prisma Docs](https://www.prisma.io/docs)

---

**Last Updated**: Phase 1 Complete - Dashboard & JSON Ingestion Working
**Next Step**: Implement authentication with NextAuth.js
