/**
 * Design System - Main Export
 * Central export for all design tokens and themes
 */

export * from './tokens/colors';
export * from './tokens/spacing';
export * from './tokens/typography';
export * from './tokens/radii';
export * from './tokens/shadows';

export * from './themes/light';
export * from './themes/dark';

// Re-export for convenience
import { colors } from './tokens/colors';
import { spacing, containerSizes } from './tokens/spacing';
import { typography } from './tokens/typography';
import { radii } from './tokens/radii';
import { shadows } from './tokens/shadows';
import { lightTheme } from './themes/light';
import { darkTheme } from './themes/dark';

export const designSystem = {
    colors,
    spacing,
    containerSizes,
    typography,
    radii,
    shadows,
    themes: {
        light: lightTheme,
        dark: darkTheme,
    },
} as const;

export type DesignSystem = typeof designSystem;
