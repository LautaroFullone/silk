import { Router, type Request, type Response } from 'express'
import { handleRouteError } from '../errors/handleRouteError'
import prismaClient from '../prisma/prismaClient'
import { sleep } from '../utils/sleep'

const testimonialsRouter = Router()

// GET -> listar testimonios
testimonialsRouter.get('/', async (req: Request, res: Response) => {
   await sleep(3000)
   try {
      const testimonials = await prismaClient.testimonial.findMany({
         orderBy: { createdAt: 'desc' },
      })

      return res.status(200).send({
         testimonials,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// GET -> obtener testimonio por id
testimonialsRouter.get('/:testimonialId', async (req, res) => {
   await sleep(5000)
   const { testimonialId } = req.params

   try {
      const testimonial = await prismaClient.testimonial.findFirstOrThrow({
         where: { id: testimonialId },
         // select: {
         //    id: true,
         //    name: true,
         //    basePrice: true,
         //    code: true,
         //    category: { select: { id: true, name: true } },
         // },
      })

      return res.send({
         message: 'Testimonio obtenido',
         testimonial,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// PATCH -> actualizar testimonio y manejar categoría
// testimonialsRouter.patch('/:testimonialId', async (req: Request, res: Response) => {
//    await sleep(5000)
//    const { testimonialId } = req.params

//    try {
//       // 1) validar payload
//       const body = articleUpdateSchema.parse(req.body)

//       // 2) buscar artículo actual, sino tira excepcion
//       const currentArticle = await prismaClient.article.findUniqueOrThrow({
//          where: { id: articleId },
//          include: { category: true },
//       })

//       // 3) preparar update solo con cambios reales
//       if (!hasRealChanges(currentArticle, body)) {
//          return res.send({
//             message: 'No hay cambios para aplicar',
//             article: currentArticle,
//          })
//       }

//       // 4) actualizar usando transacción para manejar categorías
//       const result = await prismaClient.$transaction(async (tx) => {
//          let categoryDeleted = null
//          const updateData: any = { ...body }
//          const oldCategoryId = currentArticle.category.id

//          // Si hay cambio de categoría
//          if (body?.categoryName && body.categoryName !== currentArticle.category.name) {
//             // Usar connectOrCreate para la nueva categoría
//             updateData.category = {
//                connectOrCreate: {
//                   where: { name: body.categoryName },
//                   create: { name: body.categoryName },
//                },
//             }
//             console.log('## 3 updateData', updateData) //
//          }
//          // Eliminar categoryName del objeto de actualización para evitar errores
//          delete updateData.categoryName //categoryName no existe en el modelo Article, existe category: {id,name}

//          const updatedArticle = await tx.article.update({
//             where: { id: articleId },
//             data: updateData,
//             include: { category: true },
//          })

//          // Solo verificar la categoría antigua si cambió
//          if (body?.categoryName && updatedArticle.category.id !== oldCategoryId) {
//             // Verificar si la categoría anterior tiene más artículos
//             const oldCategoryHasMoreArticles = await tx.article.findFirst({
//                where: {
//                   categoryId: oldCategoryId,
//                },
//             })

//             // Eliminar la categoría anterior si no tiene más artículos
//             if (!oldCategoryHasMoreArticles) {
//                categoryDeleted = await tx.articleCategory.delete({
//                   where: { id: oldCategoryId },
//                })
//             }
//          }

//          return {
//             updatedArticle,
//             categoryDeleted,
//          } as const
//       })

//       return res.status(200).send({
//          message: result.categoryDeleted
//             ? 'Artículo actualizado y categoría anterior eliminada'
//             : 'Artículo actualizado',
//          article: result.updatedArticle,
//       })
//    } catch (error) {
//       return handleRouteError(res, error)
//    }
// })

// // DELETE -> eliminar artículo
// testimonialsRouter.delete('/:articleId', async (req: Request, res: Response) => {
//    const { articleId } = req.params

//    try {
//       const result = await prismaClient.$transaction(async (tx) => {
//          // 1) Eliminar el artículo
//          const articleDeleted = await tx.article.delete({
//             where: { id: articleId },
//             include: { category: { select: { id: true } } },
//          })

//          // Verificar si la categoría tiene más artículos
//          const categoryHasMoreArticles = await tx.article.findFirst({
//             where: {
//                categoryId: articleDeleted.category.id,
//                id: { not: articleDeleted.id }, // Excluir el que acabamos de eliminar
//             },
//          })

//          // 3) Solo eliminar la categoría si no tiene más artículos
//          let categoryDeleted = null

//          if (!categoryHasMoreArticles) {
//             categoryDeleted = await tx.articleCategory.delete({
//                where: { id: articleDeleted.category.id },
//             })
//          }

//          return {
//             articleDeleted,
//             categoryDeleted,
//          } as const
//       })

//       return res.status(200).send({
//          message: result.categoryDeleted
//             ? 'Artículo y categoría eliminados'
//             : 'Artículo eliminado',
//          article: result.articleDeleted,
//          category: result.categoryDeleted, //category solo se envía si se eliminó la categoría
//       })
//    } catch (error) {
//       return handleRouteError(res, error)
//    }
// })

export default testimonialsRouter
