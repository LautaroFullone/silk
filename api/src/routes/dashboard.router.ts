import { Router, type Request, type Response } from 'express'
import { handleRouteError } from '../errors/handleRouteError'
import prismaClient from '../prisma/prismaClient'


const dashboardRouter = Router()

// GET -> estadísticas optimizadas para dashboard
dashboardRouter.get('/stats', async (req: Request, res: Response) => {

   try {
      // Ejecutar todas las queries en paralelo para mejor performance
      const [postsStats, testimonialsStats, requestsStats, recentPosts, recentRequests] =
         await Promise.all([
            // Stats de posts
            prismaClient.post
               .aggregate({
                  _count: { id: true },
                  where: { isActive: true },
               })
               .then(async (activeCount) => {
                  const totalCount = await prismaClient.post.count()
                  return {
                     total: totalCount,
                     active: activeCount._count.id,
                  }
               }),

            // Stats de testimonios
            prismaClient.testimonial
               .aggregate({
                  _count: { id: true },
                  where: { isHighlight: true },
               })
               .then(async (highlightedCount) => {
                  const totalCount = await prismaClient.testimonial.count()
                  return {
                     total: totalCount,
                     highlighted: highlightedCount._count.id,
                  }
               }),

            // Stats de requests agrupadas por status
            prismaClient.serviceRequest
               .groupBy({
                  by: ['status'],
                  _count: { id: true },
               })
               .then(async (statusGroups) => {
                  const totalCount = await prismaClient.serviceRequest.count()

                  // Inicializar todos los estados en 0
                  const byStatus = {
                     PENDING: 0,
                     CONTACTED: 0,
                     CONTRACTED: 0,
                     CANCELLED: 0,
                  }

                  // Llenar con los datos reales
                  statusGroups.forEach((group) => {
                     byStatus[group.status as keyof typeof byStatus] = group._count.id
                  })

                  return {
                     total: totalCount,
                     byStatus,
                  }
               }),

            // Posts recientes (solo los campos necesarios)
            prismaClient.post.findMany({
               take: 5,
               orderBy: { date: 'desc' },
               select: {
                  id: true,
                  title: true,
                  date: true,
                  author: true,
               },
            }),

            // Requests recientes (solo los campos necesarios)
            prismaClient.serviceRequest.findMany({
               take: 5,
               orderBy: { createdAt: 'desc' },
               select: {
                  id: true,
                  name: true,
                  status: true,
                  createdAt: true,
               },
            }),
         ])

      const stats = {
         posts: {
            ...postsStats,
            recent: recentPosts,
         },
         testimonials: testimonialsStats,
         requests: {
            ...requestsStats,
            recent: recentRequests,
         },
      }

      return res.status(200).send({
         stats,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

export default dashboardRouter
