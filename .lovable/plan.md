

# Update Social Links in Contact Section

## Overview
Update the social media links in the contact section footer to use your correct URLs and properly configure the email link with a pre-filled body message.

## Current Links (lines 9-13)
- GitHub: `https://github.com/shreyashshinde` (incorrect)
- LinkedIn: `https://linkedin.com/in/shreyashshinde` (incorrect)
- Email: `mailto:shreyash@example.com` (incorrect, no body)

## Updated Links
- **GitHub**: `https://github.com/ShreyashS19`
- **LinkedIn**: `https://www.linkedin.com/in/shreyash-shinde19/`
- **Email**: `mailto:shindeshreyash363@gmail.com?subject=Hello from Portfolio&body=Hi Shreyash,%0A%0AI found your portfolio and wanted to reach out.%0A%0A`

## Technical Details

### File: `src/components/sections/ContactSection.tsx`

**Lines 9-13** - Update the `socialLinks` array:

```typescript
const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/ShreyashS19', color: 'hover:text-foreground' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/shreyash-shinde19/', color: 'hover:text-primary' },
  { icon: Mail, label: 'Email', href: 'mailto:shindeshreyash363@gmail.com?subject=Hello from Portfolio&body=Hi Shreyash,%0A%0AI found your portfolio and wanted to reach out.%0A%0A', color: 'hover:text-accent' },
];
```

### Email `mailto` Format Explanation
- `mailto:` - Opens the default email client
- `?subject=` - Pre-fills the subject line
- `&body=` - Pre-fills the email body
- `%0A` - URL-encoded newline character for line breaks

This will open the user's email client with:
- **To**: shindeshreyash363@gmail.com
- **Subject**: Hello from Portfolio
- **Body**: "Hi Shreyash, I found your portfolio and wanted to reach out."

