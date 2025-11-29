/**
 * Design System - Dark Theme
 * Dark mode color mappings
 */

import { colors } from '../tokens/colors';

export const darkTheme = {
    colors: {
        // Background
        background: {
            primary: colors.background.dark,
            secondary: colors.dark[900],
            tertiary: colors.dark[800],
        },

        // Text
        text: {
            primary: colors.text.inverse,
            secondary: colors.dark[300],
            tertiary: colors.dark[400],
            inverse: colors.text.primary,
        },

        // Borders
        border: {
            light: colors.dark[800],
            medium: colors.dark[700],
            dark: colors.dark[600],
        },

        // Interactive
        interactive: {
            primary: colors.primary[500],
            primaryHover: colors.primary[400],
            primaryActive: colors.primary[300],
            secondary: colors.accent[500],
            secondaryHover: colors.accent[400],
            secondaryActive: colors.accent[300],
        },

        // Status
        status: {
            success: colors.success[500],
            warning: colors.warning[500],
            error: colors.error[500],
            info: colors.primary[500],
        },
    },
} as const;

export type DarkTheme = typeof darkTheme;
