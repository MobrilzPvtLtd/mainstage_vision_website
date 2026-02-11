# MainStage Vision - Music Festival Website Clone

A modern, responsive clone of the MainStage Vision website built with Next.js 16, Tailwind CSS 3, and shadcn/ui components.

## 🎨 Design Features

- **Brand Colors**: 
  - Dark Navy Background: `#15171e`
  - Vibrant Pink Accent: `#e91e63`
  - Light Gray Background: `#f9f9f9`

- **Typography**: Montserrat font family for a clean, modern look

- **Responsive Design**: Mobile-first approach with responsive grids and layouts

- **Modern UI Components**: 
  - Gradient backgrounds
  - Hover effects and transitions
  - Shadow effects
  - Badge components
  - Card layouts

## 📁 Project Structure

```
mainstage-vision/
├── app/
│   ├── page.tsx              # Homepage
│   ├── nieuws/page.tsx       # News page
│   ├── albums/page.tsx       # Photo albums page
│   ├── videos/page.tsx       # Videos page
│   ├── events/page.tsx       # Events page
│   ├── artiesten/page.tsx    # Artists page
│   ├── layout.tsx            # Root layout with navigation and footer
│   └── globals.css           # Global styles with brand colors
├── components/
│   ├── navigation.tsx        # Header navigation component
│   ├── footer.tsx            # Footer component
│   └── ui/                   # shadcn/ui components
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mainstage-vision
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📄 Pages

### Homepage (`/`)
- Hero section with gradient background
- Recent photo albums grid
- Latest news section with featured article
- Upcoming events showcase

### Nieuws (`/nieuws`)
- News articles grid layout
- Featured article with large card
- Category badges
- Timestamp information

### Foto Albums (`/albums`)
- Photo album grid with hover effects
- Photo count badges
- Gradient overlays

### Video's (`/videos`)
- Video grid with play button overlays
- Duration badges
- View counts and timestamps
- Category tags

### Events (`/events`)
- Detailed event listings
- Date, time, location, and pricing information
- Ticket status badges (Available, Almost Sold Out, Sold Out, Pre-sale)
- Genre tags

### Artiesten (`/artiesten`)
- Artist profile cards
- Verified badges
- Follower counts
- Genre information

## 🛠️ Technologies Used

- **Next.js 16**: React framework with App Router
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **TypeScript**: Type-safe development
- **Lucide React**: Icon library

## 🎯 Features

- ✅ Fully responsive design
- ✅ Modern gradient backgrounds
- ✅ Smooth hover animations
- ✅ SEO-optimized metadata
- ✅ Accessible components
- ✅ Mobile navigation menu
- ✅ Dutch language content

## 📝 Notes

- The current implementation uses placeholder data. In production, you would connect to a CMS or API for dynamic content.
- Image placeholders are used with gradient backgrounds. Replace with actual images in the `/public` directory.
- All text content is in Dutch to match the original MainStage Vision website.

## 🔧 Customization

### Changing Brand Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --mainstage-dark: #15171e;
  --mainstage-pink: #e91e63;
  --mainstage-light-bg: #f9f9f9;
}
```

### Adding New Pages

Create a new folder in the `app` directory with a `page.tsx` file:

```bash
mkdir app/new-page
touch app/new-page/page.tsx
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 📄 License

This is a clone project for educational purposes.

---

Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui
# mainstage_vision_website
