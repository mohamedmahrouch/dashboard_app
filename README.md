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
