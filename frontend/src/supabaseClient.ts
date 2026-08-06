import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallback to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY 

// Debug environment variables
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseKey ? 'Present' : 'Missing')

export const supabase = createClient(supabaseUrl, supabaseKey)