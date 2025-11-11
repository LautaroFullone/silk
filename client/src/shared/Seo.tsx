import { Helmet } from 'react-helmet-async'

interface SeoProps {
   title: string
   description?: string
   image?: string
   url?: string
   type?: 'website' | 'article'
   keywords?: string[]
   author?: string
   publishedTime?: string
   modifiedTime?: string
   section?: string
   tags?: string[]
   noIndex?: boolean
   jsonLd?: object
}

const Seo = ({
   title,
   description = 'Estudio Silk - Especialistas en colorimetría, asesoría de imagen y estilismo personal. Transformamos tu estilo en una herramienta de confianza y autenticidad.',
   image = 'https://estudiosilk.com/og-image.jpg',
   url = 'https://estudiosilk.com/',
   type = 'website',
   keywords = [
      'colorimetría',
      'asesoría de imagen',
      'estilismo personal',
      'consultoría de moda',
      'transformación de imagen',
   ],
   author = 'Estudio Silk',
   publishedTime,
   modifiedTime,
   section,
   tags,
   noIndex = false,
   jsonLd,
}: SeoProps) => {
   const fullTitle = title.includes('SILK')
      ? title
      : `${title} | SILK - Estudio de Colorimetría`
   const keywordsString = keywords.join(', ')

   return (
      <Helmet>
         {/* Básico */}
         <title>{fullTitle}</title>
         <meta name="description" content={description} />
         <meta name="keywords" content={keywordsString} />
         <meta name="author" content={author} />
         <link rel="canonical" href={url} />

         {/* Robots */}
         {noIndex && <meta name="robots" content="noindex, nofollow" />}

         {/* Open Graph */}
         <meta property="og:type" content={type} />
         <meta property="og:site_name" content="SILK - Estudio de Colorimetría" />
         <meta property="og:title" content={fullTitle} />
         <meta property="og:description" content={description} />
         <meta property="og:image" content={image} />
         <meta property="og:image:width" content="1200" />
         <meta property="og:image:height" content="630" />
         <meta property="og:image:alt" content={`${title} - Estudio Silk`} />
         <meta property="og:url" content={url} />
         <meta property="og:locale" content="es_AR" />

         {/* Artículos específicos */}
         {type === 'article' && (
            <>
               {publishedTime && (
                  <meta property="article:published_time" content={publishedTime} />
               )}
               {modifiedTime && (
                  <meta property="article:modified_time" content={modifiedTime} />
               )}
               {author && <meta property="article:author" content={author} />}
               {section && <meta property="article:section" content={section} />}
               {tags &&
                  tags.map((tag) => (
                     <meta key={tag} property="article:tag" content={tag} />
                  ))}
            </>
         )}

         {/* Twitter Card */}
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:site" content="@estudiosilk" />
         <meta name="twitter:creator" content="@estudiosilk" />
         <meta name="twitter:title" content={fullTitle} />
         <meta name="twitter:description" content={description} />
         <meta name="twitter:image" content={image} />
         <meta name="twitter:image:alt" content={`${title} - Estudio Silk`} />

         {/* Additional Meta Tags */}
         <meta name="theme-color" content="#d4af37" />
         <meta name="msapplication-TileColor" content="#d4af37" />

         {/* JSON-LD específico de página */}
         {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      </Helmet>
   )
}

export default Seo
