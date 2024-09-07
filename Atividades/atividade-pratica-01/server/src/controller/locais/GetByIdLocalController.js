import { prisma } from "../../database/client.js";

export class GetByIdLocalController {

    async handle(request,response) {

        const { id } = request.params

        try {
            const local = await prisma.locais_Coleta.findFirstOrThrow({
                where: {
                    id: parseInt(id)
                },

                include: {
                    cidade: true
                }
            })

            return response.json(local)
            
        } catch (error) {
            return response.status(400).json(error)
        }

    }
}