// client/src/lib/supabasePublic.ts
import { createClient } from '@supabase/supabase-js'

export const supabasePublic = createClient(
   'https://xyzcompany.supabase.co',
   'patagones1607'
)

export function getPublicImageUrl(path?: string | null) {
   if (!path) return ''
   const { data } = supabasePublic.storage.from('silk-public').getPublicUrl(path)
   return data.publicUrl
}
