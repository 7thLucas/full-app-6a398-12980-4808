# LocalPulse — Product Overview

## 1. What It Is

**LocalPulse** is a mobile-first, full-stack social media management platform built exclusively for local service businesses — plumbers, contractors, landscapers, HVAC technicians, boutique shops, and similar trades. It combines AI-generated hyperlocal content, a streamlined post-approval "Swipe Queue," inbound lead tracking, and reputation management into a single premium dashboard.

The UI is dark-mode dominant with glassmorphic accent cards, vibrant status pills, and micro-transitions — optimized for fast, on-the-go use by busy tradespeople and small business owners.

---

## 2. Target Users

**Primary persona — Owner-operators** of local service businesses (1–10 employees) with no dedicated social media strategy. Time-poor, community-oriented, need results not complexity.

**Secondary persona — Front-office staff or small marketing managers** handling social for a service business. Need a tool that does the thinking for them.

**Sample users**:
- Joe's Plumbing — Spartanburg, SC
- Premier Landscaping — Greenville, SC
- BrightHome Contractors — Asheville, NC

**Target industries**: Plumbing, HVAC, Landscaping, General Contracting, Boutique Retail, and similar local trades.

---

## 3. Positioning

> "The social media command center built for trades and service pros — not for agencies."

Every generated post, lead reply, and review response is infused with the business's actual town, industry vertical, and brand voice — not generic templates. This hyperlocal specificity is the core differentiator.

---

## 4. Brand & Tone

- **User-selectable brand voice**: Professional · Friendly · Humorous
- **Visual identity**: Premium, modern dark-mode; emerald green accents for approvals and growth signals; vibrant status pills (High Intent = emerald, General = sky blue, Failed = red, Pending = amber); glassmorphic cards on dark indigo backgrounds
- **App feel**: A trading dashboard meets a social command center — data-dense but calm, never cluttered

---

## 5. Core Screens & Features

### 5.1 Multi-Step Onboarding (5 steps)
1. Business Name input
2. Industry Vertical dropdown (Plumbing · HVAC · Landscaping · Contracting · Boutique Retail · Other)
3. Target Town/Locale input (e.g., "Spartanburg, SC")
4. Brand Tone selector: Professional · Friendly · Humorous
5. Connect Social Accounts mockup flow (Facebook, Instagram, Google Business)

**Dynamic hydration**: once onboarding completes, all placeholder content throughout the app is replaced with the actual business name, locale, and tone in real time.

### 5.2 Swipe Queue (Core Dashboard)
- "Next Upcoming Post" card: mock visual asset preview + full AI-generated caption
- Dynamic copy: business name and locale auto-injected into every caption (e.g., "Joe's Plumbing in Spartanburg")
- Three primary action buttons: **[🔄 Regenerate]** · **[✏️ Edit Text]** · **[✅ APPROVE]**
- APPROVE advances the post into the publishing queue with `delivery_status = Approved`
- **AI Asset Customizer sub-panel**: toggle chips for **[📐 Carousel Post]** · **[🎬 Reels Script]** · **[🖼️ Single Image Banner]** — updates the post aspect ratio preview live on tap

### 5.3 Daily Growth Checklist
- Positioned directly beneath the Swipe Queue card
- Actionable checkboxes driven from `social_leads` and `publishing_queue` data:
  - "⬜ Reply to John's Comment (AI Draft Ready)"
  - "⬜ Engage with 2 local business partners"

### 5.4 Lead Capture Hub
- Tracks inbound DM leads from connected social channels
- **Intent Score badges**: High Intent (emerald) · General (sky blue)
- "One-Tap AI Smart Reply" button per lead message row
- Data from `social_leads` table

### 5.5 Review & Reputation Radar
- Aggregated local reviews (mock Google + Facebook integration)
- Star rating display (1–5 stars) per review
- Pre-drafted AI SEO-optimized response per review, one-tap deploy
- Keyword-optimized responses designed to improve hyper-local search ranking
- Data from `customer_reviews` table

### 5.6 Local Trending Topics Widget
- Parses regional weather/event alerts to suggest seasonal content angles
- Example: "⚠️ Winter weather warning in your area next week — perfect timing to promote freeze protection tips!"

### 5.7 Growth Analytics Dashboard
- **Local Map Visibility Index**: circular progress ring displaying local consumer brand reach %
- **Estimated Value of Saved Time**: financial ticker (hours saved × standard trade hourly rate)
- **Total Revenue Opportunities Unlocked**: combined lead + review interaction value display

---

## 6. Backend Data Schemas (Relational)

| Table | Key Fields |
|---|---|
| `users` | id (UUID), email, created_at |
| `business_profiles` | id, user_id, business_name, industry_vertical, target_locale, brand_tone, created_at |
| `social_channels` | id, business_id, platform_name, platform_account_id, access_token, is_active, created_at |
| `posts_content` | id, business_id, pillar_type (Educational · Promotional · Community), caption_text, image_url, ai_prompt_used, created_at |
| `publishing_queue` | id, post_id, channel_id, scheduled_for, delivery_status (Pending · Approved · Published · Failed), published_at |
| `social_leads` | id, customer_name, platform_source, message_snippet, intent_score (High Intent · General), ai_suggested_reply, status (Unanswered · Replied) |
| `customer_reviews` | id, reviewer_name, rating_stars (1–5), review_text, ai_seo_response, is_posted |

---

## 7. Content Strategy (Three Pillars)

- **Educational**: Trade tips and how-tos relevant to the local area and season
- **Promotional**: Service spotlights, pricing offers, seasonal promotions
- **Community**: Local shout-outs, business partnerships, community involvement

---

## 8. MVP Scope

**Included in MVP**: Full onboarding flow, Swipe Queue with Approve/Regenerate/Edit, Lead Capture Hub, Review & Reputation Radar, Trending Topics widget, Growth Analytics dashboard. All screens populated with realistic hyper-local sample data (Joe's Plumbing, Spartanburg, SC).

**Post-MVP**: Real OAuth integration for social channel connections (mockup-only in MVP), live weather API for Trending Topics, actual social media publishing API calls.

---

## 9. Sample Data Seed (Spartanburg, SC)

- Business: Joe's Plumbing · Spartanburg, SC · Brand Tone: Friendly
- Sample lead: "Hi, what do you charge for a water heater replacement?" — High Intent · Unanswered
- Sample review: "Joe's team fixed our burst pipe at midnight — incredible service!" — 5 stars
- Sample post (Educational): "❄️ Spartanburg temps dropping this week — here's how to keep your pipes from freezing this winter. Call Joe's Plumbing if you need a pro! 📞"
