# One-Stop Stress Relief

A comprehensive marketplace application connecting individuals seeking stress relief with verified experts offering personalized digital solutions.

## 🌟 Overview

**One-Stop Stress Relief** is a dual-sided marketplace designed to bridge the gap between expensive therapy and accessible mental wellness. 
- **Seekers (Clients)** post their specific stress triggers (like work deadlines, relationship issues) and budget.
- **Experts** create and sell digital "relief packages" containing guided audio, worksheets, and schedules.

The platform uses **AI Matching** to pair users with the most relevant solution packages based on their stress type, lifestyle, and budget, ensuring effective results at a fraction of traditional therapy costs.

## 🚀 Key Features

### For Seekers (Clients)
- **AI-Powered Matching**: Get matched with packages that fit your specific stress triggers and financial constraints.
- **Personalized Content**: Access tailored packages with guided meditations, time management tools, and coping strategies.
- **Voice-Enabled AI Chat**: Interact with an empathetic AI assistant using real-time voice recognition for immediate support and recommendations.
- **Wishlist & Library**: Save interesting packages for later and access purchased content (videos, PDFs) anytime from your dashboard.
- **Secure Payments**: Purchase solutions seamlessly using safe digital payment methods.

### For Experts
- **Content Creation Studio**: Build professional packages using built-in templates for audio guides, PDF worksheets, and progress trackers.
- **Dynamic Pricing**: Set your own prices ($10-$50+) and adjust based on performance analytics.
- **Earning Potential**: Keep **80% of every sale** (up to 90% for top-rated experts). Payments are processed weekly.
- **Analytics Dashboard**: Track sales, user engagement, and rating trends in real-time.
- **Verification System**: Submit credentials to become a verified expert and unlock premium pricing tiers.

## 🛠️ Technology Stack

This project is built with a modern, performance-focused stack:

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with local storage persistence
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI/Voice**: Native Web Speech API & Mock AI Logic

## 🏁 Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd one-stop-stress-relief
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `/app`: Next.js App Router pages and API routes.
  - `/client`: Client-facing pages (Marketplace, My Packages, Chat).
  - `/expert`: Expert-facing pages (Dashboard, Create Package, Analytics).
- `/src/components`: Reusable UI components and feature-specific blocks.
- `/src/lib`: Utility functions and global state (`store.ts`).

## 💼 Business Model

- **Users**: Pay per package.
- **Platform Fee**: The app takes a roughly 20% commission on transactions.
- **Expert Payout**: Experts receive ~80% of sales. Top-rated experts can earn up to 90%.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details on how to submit pull requests, report issues, or request features.

---
*Empowering wellness, one package at a time.*
