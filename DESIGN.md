# LocalPulse — Design Guidelines

## Visual Identity
- Style: Premium dark-mode, glassmorphism, mobile-first
- Mood: Confident, modern, trade-professional — not corporate, not cluttered

## Color Palette
- Background primary: #0f1117 (deep charcoal)
- Background secondary: #1a1f2e (deep slate)
- Brand accent / primary CTA: #00d4ff (cyan / electric blue)
- Card surfaces: rgba(255,255,255,0.05) with 1px rgba(255,255,255,0.10) border (glassmorphic)
- Status — success/green: #22c55e
- Status — warning/amber: #f59e0b
- Status — error/red: #ef4444
- Text primary: #f1f5f9
- Text secondary: #94a3b8

## Typography
- Font family: Inter (or system-ui fallback)
- Headings: Bold, tracking-tight
- Body: Regular 14-15px, high contrast on dark backgrounds
- Labels/chips: 12px, uppercase or semibold

## Elevation & Glassmorphism
- Cards: backdrop-blur-md, bg-white/5, border border-white/10, rounded-2xl
- Modal overlays: backdrop-blur-lg, bg-black/60
- Prominent CTAs (APPROVE): bg-green-500, shadow-lg with green glow
- Active tab indicator: cyan underline or glow

## Components
- Chips/pills: rounded-full, px-3 py-1, text-xs font-semibold
  - Intent High: bg-green-500/20 text-green-400 border border-green-500/30
  - Intent General: bg-amber-500/20 text-amber-400 border border-amber-500/30
  - Pillar badge: bg-cyan-500/20 text-cyan-400
- Buttons:
  - Primary (APPROVE): bg-green-500 text-white rounded-xl py-4 font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)]
  - Secondary (outlined): border border-white/20 bg-white/5 text-white rounded-xl py-3
  - Accent (AI actions): bg-cyan-500/10 border border-cyan-500/30 text-cyan-400
- Progress ring: SVG circle, stroke #00d4ff, strokeWidth 8, on dark circle
- Star ratings: filled yellow #fbbf24, empty gray #374151
- Bottom tab bar: bg-#1a1f2e, border-t border-white/10, active icon cyan, inactive slate-400

## Motion & Micro-interactions
- Page transitions: fade + slight upward slide (200ms ease-out)
- Button press: scale-95 on active
- Checkbox toggle: smooth check animation
- Modal: slide-up from bottom with backdrop fade
- Chip selection: bg transition 150ms

## Layout
- Mobile-first: max-width 430px centered on desktop, full-width on mobile
- Padding: px-4 on screen edges, gap-3 between cards
- Safe area: pb-20 for bottom tab bar clearance
- Onboarding: centered cards with step progress dots at top

## PWA
- Manifest: name "LocalPulse", short_name "LocalPulse", theme_color "#0f1117", background_color "#0f1117", display "standalone"
- App icons: use cyan gradient favicon
