export function getPublicImageUrl(imagePath: string | undefined): string {
   if (!imagePath) return '/image-placeholder.svg'

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseBucket = import.meta.env.VITE_SUPABASE_BUCKET

   if (!supabaseUrl || !supabaseBucket) {
      throw new Error('Missing Supabase environment variables on client')
   }

   return `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/${imagePath}`
}
