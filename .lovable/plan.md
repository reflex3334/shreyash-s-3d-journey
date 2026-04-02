

# Add Hover Glow Pulse & Scale-Up Animation to Planets

## Changes

### `src/components/3d/SkillsOrbit.tsx` — Planet `useFrame` loop

**Scale pulse**: When hovered, add a subtle oscillating scale multiplier using `Math.sin(time * 3) * 0.08 + 1.0` so the planet gently pulses between ~1.22x and ~1.38x instead of static 1.3x.

**Glow pulse**: When hovered, animate the glow sphere opacity with a sine wave (`Math.sin(time * 4) * 0.2 + 0.7`) creating a breathing glow effect between 0.5 and 0.9 opacity. Also increase the glow sphere scale multiplier from 1.5x to 2.0x on hover for a larger, more dramatic aura.

**Emissive pulse**: When hovered, animate `emissiveIntensity` on the planet material with `Math.sin(time * 3) * 0.3 + 0.8` so the planet itself brightens and dims subtly.

Specific line changes:
- Line 268: `const hoverScale = isHovered ? (1.3 + Math.sin(time * 3) * 0.08) : 1;`
- Line 279: `const glowIntensity = isHovered ? (0.7 + Math.sin(time * 4) * 0.2) : isFocused || planet.hasLiveDeployment ? 0.8 : 0.3;`
- Line 281: `glowRef.current.scale.copy(meshRef.current.scale).multiplyScalar(isHovered ? 2.0 : 1.5);`
- After line 275 (rotation): Add emissive intensity animation — `(meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = isHovered ? (0.8 + Math.sin(time * 3) * 0.3) : planet.isPrimary ? 0.5 : 0.3;`

## Result
- Hovered planet visually "breathes" with pulsing scale, glow aura, and emissive intensity
- Makes the paused state immediately obvious without being distracting
- Non-hovered planets remain unchanged

