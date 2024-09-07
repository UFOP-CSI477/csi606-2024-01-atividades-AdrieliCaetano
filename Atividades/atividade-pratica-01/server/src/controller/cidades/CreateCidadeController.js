import { prisma } from "../../database/client.js"

export class CreateCidadeController {

    async handle(request,response){

        const {nome, estado_id} = request.body

        try {
            await prisma.estado.findFirstOrThrow({
                where: {
                    id: parseInt(estado_id)
                }
            })

        } catch (error) {
            return response.status(400).json({
                message: 'Invalid resquest',
                error
            })

        }

        const cidade = await prisma.cidade.create({
            data: {
                nome,
                // estado_id
                estado: {
                    connect: {
                        id: parseInt(estado_id)
                    }
                }
            }
        })

        return response.json(cidade)
    }
}