import { BRAND_COLORS } from '@seedcord/brand';

function withAlpha(hex: string, alpha: number): string {
    // eslint-disable-next-line no-magic-numbers -- hex color channels
    const channels = [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16));
    return `rgba(${channels.join(', ')}, ${alpha})`;
}

const SUB_ALPHA = 0.85;

// og images and viewport.themeColor need plain hex
export const BRAND = {
    ...BRAND_COLORS,
    sub: withAlpha(BRAND_COLORS.seedDark, SUB_ALPHA)
} as const;
