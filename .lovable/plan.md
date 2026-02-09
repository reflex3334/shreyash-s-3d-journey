

# Update Social Links in Contact Section

## Overview
Update the three social media links (GitHub, LinkedIn, Email) in the contact section to point to your correct profiles and configure the email with a pre-filled message.

## What Changes

| Link | Current (Wrong) | Updated (Correct) |
|------|------------------|--------------------|
| GitHub | github.com/shreyashshinde | github.com/ShreyashS19 |
| LinkedIn | linkedin.com/in/shreyashshinde | linkedin.com/in/shreyash-shinde19/ |
| Email | shreyash@example.com (no body) | shindeshreyash363@gmail.com + pre-filled subject and body |

When someone clicks the Email link, their email app will open with:
- **To**: shindeshreyash363@gmail.com
- **Subject**: "Hello from Portfolio"
- **Body**: "Hi Shreyash, I found your portfolio and wanted to reach out."

## Technical Details

### File: `src/components/sections/ContactSection.tsx`

**Lines 10-12** - Update the `socialLinks` array URLs:

```typescript
const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/ShreyashS19', color: 'hover:text-foreground' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/shreyash-shinde19/', color: 'hover:text-primary' },
  { icon: Mail, label: 'Email', href: 'mailto:shindeshreyash363@gmail.com?subject=Hello from Portfolio&body=Hi Shreyash,%0A%0AI found your portfolio and wanted to reach out.%0A%0A', color: 'hover:text-accent' },
];
```

Single file edit, 3 lines changed.

