import { supabase } from '../supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

/**
 * Checks the current user session and returns session data if available
 * @returns Promise<Session | null> - The current session or null if no session exists
 */
export async function checkSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("Error getting session:", error);
        return null;
    }

    if (data.session) {
        return data.session;
    } else {
        console.log("No active session (user not logged in).");
        return null;
    }
}

/**
 * Gets the current user from the session
 * @returns Promise<User | null> - The current user or null if no user is logged in
 */
export async function getCurrentUser(): Promise<User | null> {
    const session = await checkSession();
    return session?.user || null;
}

