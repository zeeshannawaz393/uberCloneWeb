/**
 * Chat Accessibility Utilities
 * Helpers for keyboard navigation, screen readers, and ARIA
 */

/**
 * Announce message to screen readers
 */
export function announceMessage(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (typeof window === 'undefined') return;

    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Focus element with error handling
 */
export function focusElement(element: HTMLElement | null): void {
    if (!element) return;

    try {
        element.focus();
    } catch (error) {
        console.warn('[A11y] Failed to focus element:', error);
    }
}

/**
 * Trap focus within container
 */
export function trapFocus(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement?.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement?.focus();
            }
        }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
        container.removeEventListener('keydown', handleKeyDown);
    };
}

/**
 * Get ARIA label for message
 */
export function getMessageAriaLabel(
    senderName: string,
    content: string,
    timestamp: string
): string {
    return `Message from ${senderName} at ${timestamp}: ${content}`;
}

/**
 * Get ARIA label for typing indicator
 */
export function getTypingAriaLabel(typingUser: string): string {
    return `${typingUser} is typing`;
}

/**
 * Check if element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        element.getAttribute('aria-hidden') !== 'true'
    );
}

/**
 * Create live region for dynamic content
 */
export function createLiveRegion(
    id: string,
    priority: 'polite' | 'assertive' = 'polite'
): HTMLDivElement {
    let region = document.getElementById(id) as HTMLDivElement;

    if (!region) {
        region = document.createElement('div');
        region.id = id;
        region.setAttribute('role', 'status');
        region.setAttribute('aria-live', priority);
        region.setAttribute('aria-atomic', 'true');
        region.className = 'sr-only';
        document.body.appendChild(region);
    }

    return region;
}

/**
 * Update live region content
 */
export function updateLiveRegion(id: string, content: string): void {
    const region = document.getElementById(id);
    if (region) {
        region.textContent = content;
    }
}

/**
 * Handle escape key to close
 */
export function handleEscapeKey(callback: () => void): (e: KeyboardEvent) => void {
    return (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            callback();
        }
    };
}

/**
 * Get keyboard shortcut description
 */
export function getKeyboardShortcuts(): Array<{ key: string; description: string }> {
    return [
        { key: 'Escape', description: 'Close chat' },
        { key: 'Tab', description: 'Navigate between elements' },
        { key: 'Enter', description: 'Send message' },
        { key: 'Shift + Enter', description: 'New line in message' },
    ];
}
