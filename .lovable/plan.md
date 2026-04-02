

# Pause Hovered Planet & Show Full Info

## Problem
Currently all planets orbit continuously regardless of hover state. The hover info panel shows but the hovered planet keeps moving, making it hard to read.

## Changes

### 1. `src/components/3d/SkillsOrbit.tsx` — Planet component
- Replace the time-based angle calculation (`initialAngle + time * speed`) with an accumulated angle stored in a `useRef`
- On each frame, only increment the angle if the planet is **not** hovered and **not** selected
- This makes only the hovered planet freeze in place while all others keep orbiting

Current logic (line 247):
```ts
const angle = initialAngle.current + time * planet.orbitSpeed;
```

New logic:
```ts
// Store accumulated angle in a ref
if (!isHovered && !isSelected) {
  accumulatedAngle.current += delta * planet.orbitSpeed;
}
const angle = accumulatedAngle.current;
```

### 2. `src/components/3d/SkillsOrbit.tsx` — HoverInfoPanel display
- The `HoverInfoPanel` already shows on hover with full project info (implementation details + outcomes). No change needed there — it already displays the complete stored data.

### 3. `src/components/sections/SkillsSection.tsx`
- No changes needed. The hover state is already wired through.

## Result
- Hovering a planet freezes **only that planet** in its orbit position
- All other planets continue revolving normally
- The full info panel appears as before with all project details
- Releasing hover resumes the planet's orbit seamlessly from where it stopped

