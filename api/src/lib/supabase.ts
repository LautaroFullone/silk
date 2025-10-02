import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseBucket = process.env.SUPABASE_BUCKET || 'public'

if (!supabaseUrl || !supabaseServiceRoleKey || !supabaseBucket) {
   throw new Error('Missing Supabase environment variables on api')
}

const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey)

export { supabaseClient, supabaseBucket }
