Build a mobile-first, full-stack application for social media management tailored specifically for local service businesses (such as plumbers, contractors, landscapers, and boutique shops). The application must look premium, modern, and extremely clean, utilizing a high-end dark-mode layout with sleek glassmorphic accent cards, vibrant status pills, and micro-transitions.

### 1. COMPREHENSIVE BACKEND DATA SCHEMAS
Please automatically generate the backend relational database structures to strictly handle the following data objects:
- 'users': id (UUID), email, created_at.
- 'business_profiles': id, user_id, business_name, industry_vertical, target_locale (e.g., Spartanburg, SC), brand_tone, created_at.
- 'social_channels': id, business_id, platform_name, platform_account_id, access_token, is_active, created_at.
- 'posts_content': id, business_id, pillar_type (Educational, Promotional, Community), caption_text, image_url, ai_prompt_used, created_at.
- 'publishing_queue': id, post_id, channel_id, scheduled_for, delivery_status (Pending, Approved, Published, Failed), published_at.
- 'social_leads': id, customer_name, platform_source, message_snippet, intent_score (High Intent, General), ai_suggested_reply, status (Unanswered, Replied).
- 'customer_reviews': id, reviewer_name, rating_stars (1-5), review_text, ai_seo_response, is_posted.

### 2. PRIMARY SCREEN VIEWPORTS & USER INTERFACE FLOWS
Scaffold out the functional navigation tabs and components for these key interfaces:
1. Multi-Step Onboarding Form: Allows users to input their Business Name, pick an Industry Vertical from a dropdown, input a Target Town/Locale, select a Brand Tone (Professional, Friendly, Humorous), and tap a 'Connect Social Accounts' mockup flow.
2. The Swipe Queue (Core Dashboard Component): 
   - Displays a prominent 'Next Upcoming Post' container with a mock visual asset preview and full caption text area.
   - Program a dynamic text generation feature that automatically replaces placeholders with the user's actual profile details (e.g., if they onboarding as "Joe's Plumbing" in "Spartanburg, SC", the generated copy instantly incorporates those exact local identifiers seamlessly).
   - Under the card, build three fully interactive primary action buttons: [🔄 Regenerate], [✏️ Edit Text], and a prominent green [✅ APPROVE] button that advances the queue.
   - Add an "AI Asset Customizer" sub-panel with quick-toggle media layout chips: [📐 Carousel Post], [🎬 Reels Script], and [🖼️ Single Image Banner] that fluidly updates the aspect ratio container on tap.
3. Daily Growth Checklist Area: Positioned directly beneath the swipe card containing actionable checkboxes:
   - "⬜ Reply to John's Comment (AI Draft Ready)"
   - "⬜ Engage with 2 local business partners"

### 3. ENTERPRISE LEAD GENERATION & REPUTATION ENGINE
- "The Lead Capture Hub": An interactive layout tracking incoming direct message leads from social channels. Display a scannable row of recent customer messages flagged with bright, color-coded badges indicating a "Lead Intent Score" (e.g., 'High Intent - Pricing Inquiry' in green text). Provide a 'One-Tap AI Smart Reply' button for each message.
- "The Review & Reputation Radar": A section pulling in local business reviews (mocking Google and Facebook integration). Show star counters alongside pre-drafted, keyword-optimized AI responses ready to instantly deploy to thank reviewers and optimize hyper-local SEO.
- "Local Trending Topics Widget": A sleek info container parsing regional weather/events alerts to suggest smart seasonal content angles (e.g., "⚠️ Winter weather warning in your local area next week: Perfect timing to promote freeze protection tips!").

### 4. PREMIUM COMPONENT GROWTH ANALYTICS
Incorporate an executive stats page featuring tracking components:
- "Local Map Visibility Index": A clean circular progress ring displaying local consumer brand reach.
- "Estimated Value of Saved Time": A calculated financial ticker converting operational hours saved into a dollar amount based on standard industry trade rates.
- "Total Revenue Opportunities Unlocked": Displaying real-time lead and review interaction values.

Please build the complete functional states, wire up the conditional layout data pipelines, populate with realistic hyper-local sample content, and render a working interactive application preview.