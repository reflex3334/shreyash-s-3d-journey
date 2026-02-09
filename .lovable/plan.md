

# Add Resume Download Button

## Overview
Add a "Download Resume" button to the hero section so recruiters and visitors can easily download your resume PDF. The uploaded resume will be placed in the `public` folder for direct download access.

## What Changes

### 1. Copy resume PDF to the project
Copy `Shreyash_Shinde_9021207702.pdf` to `public/resume/Shreyash_Shinde_Resume.pdf` so it can be served as a static file and downloaded directly.

### 2. Add download button to hero section
Add a third button ("Download Resume") alongside "Explore My Work" and "Get In Touch" in the hero section. It will use the `Download` icon from lucide-react and trigger a direct file download when clicked.

### File: `src/components/sections/HeroSection.tsx`

- Import the `Download` icon from `lucide-react`
- Add a new `motion.a` button after "Get In Touch" with:
  - `href="/resume/Shreyash_Shinde_Resume.pdf"`
  - `download` attribute to trigger download instead of navigation
  - Styled with a glass look and a download icon
  - Same hover/tap animations as the other buttons

### Button layout (3 buttons in a row on desktop, stacked on mobile):
```text
[ Explore My Work ]  [ Get In Touch ]  [ Download Resume ]
```

## Result
- Clicking the button immediately downloads the resume PDF
- Works on all devices (desktop, tablet, mobile)
- Consistent styling with existing hero buttons
