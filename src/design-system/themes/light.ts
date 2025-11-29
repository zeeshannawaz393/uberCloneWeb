/**
 * Design System - Light Theme
 * Light mode color mappings
 */

import { colors } from '../tokens/colors';

export const lightTheme = {
    colors: {
        // Background
        background: {
            primary: colors.background.light,
            secondary: colors.dark[50],
            tertiary: colors.dark[100],
        },

        // Text
        text: {
            primary: colors.text.primary,
            secondary: colors.text.secondary,
            tertiary: colors.text.tertiary,
            inverse: colors.text.inverse,
        },

        // Borders
        border: {
            light: colors.border.light,
            medium: colors.border.medium,
            dark: colors.border.dark,
        },

        // Interactive
        interactive: {
            primary: colors.primary[600],
            primaryHover: colors.primary[700],
            primaryActive: colors.primary[800],
            secondary: colors.accent[600],
            secondaryHover: colors.accent[700],
            secondaryActive: colors.accent[800],
        },

        // Status
        status: {
            success: colors.success[600],
            warning: colors.warning[600],
            error: colors.error[600],
            info: colors.primary[600],
        },
    },
} as const;

export type LightTheme = typeof lightTheme;
