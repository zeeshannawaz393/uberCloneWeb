/**
 * Auth Layout
 * Authentication flow wrapper
 */

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
            {children}
        </div>
    );
}
