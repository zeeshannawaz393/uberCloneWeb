/**
 * Default Signup Route
 * Redirects to email-phone entry
 */

import { redirect } from 'next/navigation';

export default function SignupPage() {
    redirect('/signup/email-phone');
}
