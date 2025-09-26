import { createClient } from '@supabase/supabase-js'

const supabaseClient = createClient(
   'https://rzsrczjraasauflssdqq.supabase.co',
   'patagones1607' // ⚠️ server-only
)

const supabaseBucket = process.env.SUPABASE_BUCKET ?? 'silk-public'

export { supabaseClient, supabaseBucket }
