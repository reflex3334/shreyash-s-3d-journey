

# Add Experience Section

## Overview
Add a dedicated "Experience" section to the portfolio showcasing your Infosys Springboard internship, placed between About and Skills sections. Also update the resume file with the newly uploaded version.

## Content (from resume)

**Infosys Springboard Internship 6.0 — Bank Simulator Project**
- Duration: August 2025 – October 2025 (Remote)
- Built a full-stack banking management system using Java (Jersey, MySQL) and React
- Implemented real-time email notifications, authentication, validation-driven RESTful APIs, and admin dashboard
- Ensured reliability with JUnit & Mockito testing; responsive UI with Tailwind CSS
- Tech: Java, React, MySQL, Maven, JUnit, Mockito

## What Changes

### 1. Create `src/components/sections/ExperienceSection.tsx`
- Timeline-style layout with a vertical line and milestone dots (matching the dark/glass aesthetic)
- Animated entry using Framer Motion + `useInView`
- Experience card with role, company, duration, description bullets, and tech tags
- Section heading: "Experience" with gradient text accent

### 2. Update `src/pages/Index.tsx`
- Import and add `<ExperienceSection />` between `<AboutSection />` and `<SkillsSection />`

### 3. Update `src/components/Navigation.tsx`
- Add "Experience" nav item to the `navItems` array (href: `#experience`)

### 4. Update resume PDF
- Copy `Shreyash_Shinde_9021207702-2.pdf` to `public/resume/Shreyash_Shinde_Resume.pdf` (overwrite old version)

## Design
- Glass card with left border accent (primary color gradient)
- Duration badge at top-right
- Bullet points for responsibilities
- Tech stack shown as small rounded tags at the bottom
- Consistent with existing section styling (dark background, glass morphism, motion animations)

