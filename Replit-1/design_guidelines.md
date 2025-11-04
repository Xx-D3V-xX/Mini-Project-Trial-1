# Mumbai Travel Exploration App - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing primary inspiration from **Airbnb** for travel storytelling, visual hierarchy, and destination showcasing, with elements from **Booking.com** for content organization and **Google Travel** for itinerary presentation.

**Core Principles**:
- Visual-first storytelling that evokes wanderlust
- Clean, spacious layouts that let Mumbai's beauty shine
- Trust-building through authentic imagery and clear information architecture
- Effortless navigation between exploration and planning

---

## Typography

**Font System**: Google Fonts via CDN
- **Primary**: Inter (400, 500, 600, 700)
- **Accent**: Playfair Display (600, 700) - for hero headlines and section titles

**Hierarchy**:
- **Hero Headline**: text-5xl md:text-6xl lg:text-7xl, font-bold (Playfair Display)
- **Section Headers**: text-3xl md:text-4xl, font-semibold (Playfair Display)
- **Page Titles**: text-2xl md:text-3xl, font-semibold (Inter)
- **Card Titles**: text-xl font-semibold (Inter)
- **Body Large**: text-lg font-normal (Inter)
- **Body**: text-base font-normal (Inter)
- **Caption/Meta**: text-sm font-medium (Inter)
- **Micro Text**: text-xs font-normal (Inter)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for consistency

**Common Patterns**:
- Component padding: p-4 md:p-6 lg:p-8
- Section spacing: py-16 md:py-20 lg:py-24
- Card gaps: gap-6 md:gap-8
- Element spacing: space-y-4 or space-y-6
- Container margins: mx-4 md:mx-8 lg:mx-auto

**Container Widths**:
- Full-width sections: w-full
- Content container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Reading content: max-w-4xl mx-auto
- Forms: max-w-md mx-auto

**Grid Systems**:
- POI/Trail Cards: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Feature highlights: grid grid-cols-1 md:grid-cols-2 gap-8
- Itinerary timeline: Single column with max-w-3xl

---

## Component Library

### Navigation
**Header**: Sticky top navigation (sticky top-0 z-50)
- Logo left, navigation center, auth/profile right
- Height: h-16 md:h-20
- Transparent overlay on landing hero with blur backdrop
- Solid background with subtle shadow on scroll

### Landing Page

**Hero Section** (h-screen min-h-[600px] max-h-[900px]):
- Full-screen background image of Mumbai (Gateway of India, Marine Drive, or skyline)
- Centered content with max-w-4xl
- Headline + subheadline + primary CTA
- Gradient overlay for text readability (dark gradient from bottom)
- Primary CTA button with blurred background (backdrop-blur-md bg-white/20)

**Features Section** (py-20):
- 3-column grid showcasing key features
- Icon + Title + Description cards
- Icons from Heroicons (outline style)

**How It Works Section** (py-20):
- Numbered steps (3-4 steps)
- Alternating image-text layout on desktop
- Images showing app interface or Mumbai destinations

**Social Proof Section** (py-16):
- Statistics (destinations covered, itineraries generated, user satisfaction)
- 3-4 stat cards in horizontal layout

**CTA Section** (py-20):
- Centered content with compelling headline
- Primary and secondary action buttons
- Background image of Mumbai with overlay

### Authentication Pages

**Layout**: Centered card on page (max-w-md mx-auto my-12)
- Form card with padding p-8
- Logo at top
- Form fields with spacing space-y-6
- Clear error messaging below fields
- "Remember me" checkbox for login
- Link to alternate auth action (Login ↔ Register)
- Social proof element below form (e.g., "Join 10,000+ Mumbai explorers")

### Explore Page

**Header Section**: 
- Page title and description (py-8)
- Search/filter bar (sticky below main nav)
- Filter chips for categories (Heritage, Food, Nature, Adventure)

**Trail/POI Cards** (grid layout):
- Aspect ratio: aspect-[4/3] or aspect-video
- Image with gradient overlay at bottom
- Title overlaid on image (text-xl font-semibold)
- Hover: subtle scale transform (hover:scale-105) with smooth transition
- Card padding: p-6
- Meta info row (duration, difficulty, distance)
- Brief description (2 lines, truncated)
- CTA button or link to details

**Image Handling**:
- All images with rounded corners (rounded-lg md:rounded-xl)
- Fallback: Placeholder with Mumbai icon/pattern
- onError handler to swap to fallback
- Lazy loading for performance

### Profile Page

**Layout**: 2-column on desktop, stacked on mobile

**Left Column** (max-w-xs):
- Profile card (sticky top-24)
- Avatar, name, member since
- Stats (trips saved, places visited)

**Right Column** (flex-1):
- Tabbed interface (Saved Itineraries | Visit History)
- Tab content with appropriate spacing

**Itinerary Cards**:
- Horizontal layout on desktop, vertical on mobile
- Thumbnail image (aspect-square, w-24 md:w-32)
- Title, date, destinations count
- Action buttons (View, Edit, Delete) - icon buttons

**Visit History**:
- Timeline layout with connecting line
- Date markers on left, content on right
- POI thumbnail + name + brief note

### Itinerary Generation Page

**Step Wizard Interface**:
- Progress indicator at top (Step 1 of 3)
- Single-column form (max-w-2xl mx-auto)
- Generous spacing between form sections (space-y-8)

**Form Sections**:
- Preferences selection (checkboxes with icon cards)
- Duration picker (visual calendar or number input)
- Interests tags (multi-select chips)
- Special requirements (textarea)

**Generated Itinerary Display**:
- Timeline view with day-by-day breakdown
- Each day as expandable accordion
- POI cards within each day with images
- Map integration placeholder
- Save to profile CTA (sticky bottom bar on mobile)

### General Card Patterns

**Standard Card**:
- Border radius: rounded-lg md:rounded-xl
- Padding: p-6
- Shadow on hover: hover:shadow-xl transition-shadow
- Background: Solid (not transparent)

**Image Card**:
- Image container with overflow hidden
- Rounded corners matching card
- Aspect ratio constraints
- Gradient overlays for text on images

---

## Images

### Image Usage Strategy

**Hero Sections**:
1. **Landing Hero**: Full-width, high-quality Mumbai skyline or iconic landmark (Gateway of India at sunset, Marine Drive promenade). Image should evoke emotion and wanderlust.

**Content Images**:
2. **POI/Trail Cards**: Each card requires a compelling image (minimum 800x600px). Sources: Mumbai landmarks, street food, heritage sites, beaches, markets.
3. **How It Works Section**: 3-4 images showing app interface mockups or destination photos.
4. **Social Proof/Features**: Icons from Heroicons for features, optional background patterns.
5. **Profile Page**: User avatars (circular, w-24 h-24), itinerary thumbnails (square, w-32 h-32).

**Fallback Strategy**:
- Placeholder images with Mumbai-themed patterns
- Gradient backgrounds with location icon
- Unsplash fallback: `https://source.unsplash.com/800x600/?mumbai,travel`

**Image Treatment**:
- All images: rounded-lg md:rounded-xl
- Hero images: Full viewport with dark overlay (bg-black/40)
- Card images: Subtle hover zoom (scale-105, duration-300)
- Profile images: Circular (rounded-full) with border

---

## Animations

**Minimal, Purposeful Animations**:
- **Page transitions**: Fade in on route change
- **Card hover**: Scale (1.05) and shadow elevation - duration-300 ease-in-out
- **Button hover**: No custom animations (native button states only)
- **Scroll reveals**: Fade-in on scroll for section headers (using Intersection Observer)
- **Form validation**: Shake animation on error (animate-shake, brief)

**Prohibited**:
- No parallax scrolling
- No complex scroll-triggered animations
- No auto-playing carousels
- No loading spinners longer than 2 seconds

---

## Accessibility

- All form inputs: Clear labels, aria-labels, error states
- Focus states: Visible focus rings (focus:ring-2)
- Image alt text: Descriptive for all images
- Color contrast: Ensure text meets WCAG AA standards
- Keyboard navigation: All interactive elements accessible via Tab
- Screen reader: Semantic HTML (nav, main, section, article)

---

## Responsive Breakpoints

- **Mobile**: 0-767px (base Tailwind classes)
- **Tablet**: 768px-1023px (md: prefix)
- **Desktop**: 1024px+ (lg: prefix)

**Mobile-First Adjustments**:
- Navigation: Hamburger menu on mobile
- Cards: Single column grid on mobile
- Hero text: Smaller font sizes, reduced padding
- Sticky CTAs: Bottom bar for primary actions on mobile

---

## Icons

**Library**: Heroicons (outline style) via CDN

**Usage**:
- Navigation icons: w-6 h-6
- Feature icons: w-12 h-12 md:w-16 md:h-16
- Inline icons: w-5 h-5
- Button icons: w-5 h-5

**Common Icons Needed**:
- Map pin (location markers)
- Calendar (itinerary dates)
- User/user circle (profile)
- Heart (save/favorite)
- Clock (duration)
- Star (ratings)
- Search (explore filters)
- Logout/login (auth)

---

## Design Deliverables Summary

A visually rich, user-friendly Mumbai travel exploration app that balances aesthetic appeal with functional clarity. The design prioritizes authentic imagery, intuitive navigation, and effortless itinerary planning while maintaining modern web standards and accessibility. Each page should feel cohesive yet purposeful, guiding users from inspiration (landing) to exploration (trails) to planning (itinerary generation) with visual consistency and delightful interactions.