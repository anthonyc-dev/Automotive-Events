# AutoEvents - Automotive Event Platform

A modern, responsive platform for discovering and managing automotive events including car rallies, exhibitions, shows, and races.

## 🚗 Features

### Public Website

- **Hero Section** with automotive-themed background and call-to-action
- **Events Listing** with search, filtering, and multiple view modes
- **Event Details** with image galleries, maps, and sharing capabilities
- **Newsletter Subscription** for event updates
- **Responsive Design** optimized for mobile and desktop

### Organizer Portal

- **Secure Authentication** with NextAuth.js
- **Dashboard** with event statistics and analytics
- **Event Management** - add, edit, and delete events
- **Event Status Tracking** (pending, approved, published)
- **Attendee Management** with capacity tracking

### Technical Features

- **Modern Tech Stack** - Next.js 15, TypeScript, Tailwind CSS
- **Database** - PostgreSQL with Prisma ORM
- **Authentication** - NextAuth.js with credentials provider
- **Animations** - Framer Motion for smooth interactions
- **SEO Optimized** - Meta tags and structured data
- **Performance** - Optimized images and fast loading

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom automotive theme
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd eventsv1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `env.template` to `.env` and fill in your values:

   ```bash
   cp env.template .env
   ```

   Required environment variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/eventsdb"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="your-email@gmail.com"
   ADMIN_EMAIL="admin@events.com"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses the following main models:

- **User** - Event organizers with role-based access
- **Event** - Automotive events with full details
- **Newsletter** - Email subscriptions for updates

Key features:

- Event categories (Rally, Exhibition, Show, Race, etc.)
- Event status workflow (Pending → Approved → Published)
- Attendee tracking and capacity management
- Image galleries and metadata

## 🎨 Design System

### Colors

- **Primary**: Red (#dc2626) - Racing/automotive theme
- **Secondary**: Dark gray (#1f2937) - Professional contrast
- **Accent**: Amber (#fbbf24) - Highlights and CTAs

### Typography

- **Font**: Geist Sans - Modern, clean typeface
- **Headings**: Bold weights for impact
- **Body**: Optimized for readability

### Components

- Consistent design language across all components
- Hover effects and smooth transitions
- Mobile-first responsive design
- Accessibility considerations

## 🔐 Authentication

The platform uses NextAuth.js with:

- **Credentials Provider** for email/password authentication
- **Role-based Access** (Admin, Organizer)
- **Session Management** with JWT tokens
- **Protected Routes** for dashboard and admin areas

## 📱 Responsive Design

- **Mobile-first** approach with Tailwind CSS
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interface elements
- **Optimized** for various screen sizes

## 🚧 Future Enhancements

### Phase 2 Features

- **Map Integration** - Google Maps for event locations
- **Payment Processing** - Stripe integration for tickets
- **Email Notifications** - Automated event reminders
- **Multi-language Support** - English and Lithuanian
- **Advanced Analytics** - Event performance metrics

### Phase 3 Features

- **Mobile App** - React Native companion app
- **Social Features** - User profiles and reviews
- **API Integration** - Third-party calendar sync
- **Advanced Admin** - Bulk operations and reporting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email info@autoevents.com or create an issue in the repository.

---

Built with ❤️ for the automotive community
