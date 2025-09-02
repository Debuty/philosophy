import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uiurzngfvsytxftgyzln.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdXJ6bmdmdnN5dHhmdGd5emxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NzM2NzksImV4cCI6MjA3MDA0OTY3OX0.5TQuwpnJe7dCMjeOF7I_r6U4V6bKhw-iUv66MssdFmw'
export const supabase = createClient(supabaseUrl, supabaseKey)