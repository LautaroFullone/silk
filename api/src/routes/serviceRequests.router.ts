import { Router, type Request, type Response } from 'express'
import { handleRouteError } from '../errors/handleRouteError'
import { hasRealChanges } from '../utils/hasRealChanges'
import { ConflictError } from '../errors/ApiError'
import prismaClient from '../prisma/prismaClient'
import { sleep } from '../utils/sleep'
import {
   serviceRequestCreateSchema,
   serviceRequestUpdateSchema,
} from '../models/ServiceRequest'

const serviceRequestsRouter = Router()

// GET -> listar solicitudes de servicio
serviceRequestsRouter.get('/', async (req: Request, res: Response) => {
   await sleep(3000)
   try {
      const serviceRequests = await prismaClient.serviceRequest.findMany({
         orderBy: { createdAt: 'desc' },
         omit: { createdAt: true, updatedAt: true },
      })

      return res.status(200).send({
         serviceRequests,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// POST -> crear solicitud de servicio
serviceRequestsRouter.post('/', async (req: Request, res: Response) => {
   await sleep(3000)
   try {
      const body = serviceRequestCreateSchema.parse(req.body)

      const existingServiceRequest = await prismaClient.serviceRequest.findFirst({
         where: { email: body.email },
      })

      if (existingServiceRequest) {
         throw new ConflictError(
            'Ya tenemos registrada una solicitud de servicio con tus datos',
            {
               serviceRequestId: existingServiceRequest.id,
            }
         )
      }

      const createdServiceRequest = await prismaClient.serviceRequest.create({
         data: { ...body, status: 'PENDING' },
      })

      return res.status(201).send({
         message: 'Solicitud registrada! Te contactaremos pronto.',
         serviceRequest: createdServiceRequest,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// GET -> obtener solicitud de servicio por id
serviceRequestsRouter.get('/:serviceRequestId', async (req: Request, res: Response) => {
   await sleep(3000)
   const { serviceRequestId } = req.params

   try {
      const serviceRequest = await prismaClient.serviceRequest.findFirstOrThrow({
         where: { id: serviceRequestId },
         omit: { createdAt: true },
      })

      return res.status(200).send({
         serviceRequest,
      })
   } catch (error) {
      return handleRouteError(res, error)
   }
})

// PATCH -> actualizar estado de la solicitud de servicio
serviceRequestsRouter.patch(
   '/:serviceRequestId',

   async (req: Request, res: Response) => {
      await sleep(3000)
      const { serviceRequestId } = req.params

      try {
         const body = serviceRequestUpdateSchema.parse(req.body)

         const currentServiceRequest =
            await prismaClient.serviceRequest.findUniqueOrThrow({
               where: { id: serviceRequestId },
            })

         if (!hasRealChanges(currentServiceRequest, body)) {
            return res.send({
               message: 'No hay cambios para aplicar',
               serviceRequest: currentServiceRequest,
            })
         }

         const updatedServiceRequest = await prismaClient.serviceRequest.update({
            where: { id: serviceRequestId },
            data: {
               status: body.status,
            },
         })

         return res.status(200).send({
            message: 'Solicitud actualizada',
            serviceRequest: updatedServiceRequest,
         })
      } catch (error) {
         return handleRouteError(res, error)
      }
   }
)

// DELETE -> eliminar solicitud de servicio
serviceRequestsRouter.delete(
   '/:serviceRequestId',
   async (req: Request, res: Response) => {
      await sleep(3000)
      const { serviceRequestId } = req.params

      try {
         const serviceRequestDeleted = await prismaClient.serviceRequest.delete({
            where: { id: serviceRequestId },
         })

         return res.status(200).send({
            message: 'Solicitud eliminada',
            serviceRequest: serviceRequestDeleted,
         })
      } catch (error) {
         console.log('# error', error)
         return handleRouteError(res, error)
      }
   }
)

export default serviceRequestsRouter
