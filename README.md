# 🚀 Agency Dashboard - Next.js 16 Application

A modern, secure dashboard application built to view and manage agency and employee contact data. This project was developed as a **Take Home Assignment for a Jr SDE position**.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Clerk](https://img.shields.io/badge/Auth-Clerk-purple) ![Tailwind](https://img.shields.io/badge/Style-Tailwind-cyan)

## 📋 Project Overview

The application allows authenticated users to browse a database of government agencies and their associated contacts. It implements a specific business logic to limit the daily viewing of contact details to 50 items per user, simulating a "Freemium" SaaS model.

### Key Features
- **🔐 Secure Authentication:** Full integration with **Clerk** (Sign In / Sign Up / Protected Routes).
- **🏢 Agency Directory:** Unrestricted access to the full list of agencies with search/pagination.
- **👥 Contact Directory:** Access to employee details with a **daily limit**.
- **⛔ Usage Limiter:** Server-side logic blocks access after **50 contacts** are viewed in a single day.
- **💎 Premium Upgrade UI:** Displays a "Paywall" UI when the limit is reached.
- **🎨 Modern UI/UX:** Built with Tailwind CSS, Glassmorphism effects, and Lucide Icons.

---

## 🏗️ System Design & Architecture

The application uses a Server-Side strategy to handle data processing and limit enforcement without requiring a heavy database setup for this assignment.

### Data Flow Diagram

```mermaid
graph TD
    User[User] -->|Access App| Middleware{Authenticated?}
    Middleware -->|No| Login[Clerk Login Page]
    Middleware -->|Yes| Dashboard[Dashboard]
    
    Dashboard -->|Navigate| AgenciesPage[Agencies Page]
    AgenciesPage -->|Server Side| ReadCSV1[Parse agencies.csv]
    ReadCSV1 --> RenderAgencies[Render Table]
    
    Dashboard -->|Navigate| ContactsPage[Contacts Page]
    ContactsPage -->|Server Side| LimitLogic{Usage < 50?}
    
    LimitLogic -->|Yes| UpdateUsage[Increment Secure Cookie +10]
    UpdateUsage --> ReadCSV2[Parse contacts.csv]
    ReadCSV2 --> RenderContacts[Render Table with Data]
    
    LimitLogic -->|No| BlockAccess[Show Upgrade/Paywall UI]

````
#Technical Decisions
Feature	Implementation Detail	Why?
Framework	Next.js 16 (App Router)	For Server Components, simplified routing, and performance.
Usage Tracking	Secure Cookies	To persist data across reloads without the overhead of a SQL DB for this specific assignment.
Data Source	Local CSV / PapaParse	Simulates a database connection; parsed server-side to protect data.
Styling	Tailwind CSS	Rapid UI development and consistent design system.


#Getting Started
Follow these instructions to set up the project locally.
Prerequisites
Node.js 18+ installed.
A Clerk account for authentication keys.

1. Clone the repository
git clone https://github.com/mohamedmahrouch/dashboard_app
cd dashboard_app

3. Install dependencies
npm install
4. Environment Configuration
Create a .env.local file in the root directory. Add your Clerk API keys:

Env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
5. Data Setup
Ensure the data/ folder exists at the project root with the following files:
data/agencies.csv
data/contacts.csv
6. Run the Application

npm run dev
Open http://localhost:3000 to view the app.
# Project Structure

src/
├── app/                   # Next.js App Router
│   ├── agencies/          # Agency listing with pagination
│   ├── contacts/          # Contact listing with Usage Limit Logic
│   ├── dashboard/         # Main landing hub
│   ├── sign-in/           # Clerk Auth pages
│   ├── sign-up/           # Clerk Auth pages
│   └── layout.tsx         # Root layout with ClerkProvider
├── components/
│   └── Navbar.tsx         # Responsive Navigation
├── lib/
│   ├── csv.ts             # Server-side CSV parsing utility
│   └── limit.ts           # Usage limit verification logic
└── middleware.ts          # Route protection & Cookie writing logic
# Deployment
The application is fully optimized for Vercel.
Push code to GitHub.
Import the repository into Vercel.
Add the Environment Variables (Clerk Keys) in Vercel Project Settings.
Deploy.
# Author
Mohamed Mahrouch
Junior Software Development Engineer Candidate

