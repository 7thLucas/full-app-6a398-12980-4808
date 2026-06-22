# LocalPulse — Product Overview

## What It Is
LocalPulse is a mobile-first, full-stack social media management application built specifically for local service businesses — plumbers, contractors, landscapers, electricians, and boutique shops. It helps these businesses grow their local presence, manage their reputation, capture leads, and schedule content — all from a single premium mobile app.

## Target Users
Local service business owners and operators who:
- Run small-to-mid-sized trade or retail businesses in specific towns/regions
- Need to maintain an active social media presence without dedicated marketing staff
- Want AI-powered tools to generate hyper-local content, reply to leads, and respond to reviews
- Value their time and want automation that feels personal and on-brand

## Business Context
- Brand: LocalPulse
- Tone: Premium, confident, practical — "built for the trades"
- Anti-references: Generic SaaS dashboards, corporate enterprise tools, cluttered UIs
- Strategic principle: Every screen should feel like it saves the user time and makes them money

## Core Value Propositions
1. AI-generated hyper-local captions that reference the business name and town
2. One-tap lead reply drafts from social DMs
3. SEO-optimized review responses auto-drafted by AI
4. Visual growth analytics framed in dollars and time saved
5. Content scheduling queue with swipe-to-approve UX

## Tech Stack
- Frontend: React (Vite), TypeScript, Tailwind CSS
- Routing: React Router
- Backend/DB: Supabase (PostgreSQL + Auth)
- Deployment target: PWA (mobile-first, offline-capable)

## Database Entities
- business_profiles: business name, industry vertical, target locale, brand tone
- social_channels: platform connections (Facebook, Instagram, Google Business)
- posts_content: AI-generated captions with pillar type (Educational, Promotional, Community)
- publishing_queue: scheduled posts with delivery status (Pending, Approved, Published, Failed)
- social_leads: inbound DMs with intent scoring and AI reply drafts
- customer_reviews: star ratings with AI SEO response drafts

## Navigation
Bottom tab navigator — 4 tabs:
1. Queue (home/main dashboard)
2. Leads
3. Reviews
4. Analytics

## Onboarding
5-step wizard shown to new users before main app:
1. Business Name
2. Industry Vertical (dropdown)
3. Target Locale (text input)
4. Brand Tone (chip selector: Professional / Friendly / Humorous)
5. Connect Social Accounts (mockup platform cards)

## Sample Data
All screens pre-populated with realistic mock data for "Joe's Plumbing" in "Spartanburg, SC"
