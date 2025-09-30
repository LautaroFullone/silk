import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseBucket = process.env.SUPABASE_BUCKET || 'public'

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Service Role Key:', supabaseServiceRoleKey)
console.log('Supabase Bucket:', supabaseBucket)

if (!supabaseUrl || !supabaseServiceRoleKey || !supabaseBucket) {
   throw new Error('Missing Supabase environment variables on api')
}

const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey)

export { supabaseClient, supabaseBucket }
