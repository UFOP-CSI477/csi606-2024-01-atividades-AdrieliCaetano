import { prisma } from "../../database/client.js";

export class GetByIdDoacaoController {

    async handle(request,response) {

        const { id } = request.params

        try {
            const doacao = await prisma.doacoes.findFirstOrThrow({
                where: {
                    id: parseInt(id)
                },

                include: {
                    pessoa: true,
                    local:true
                }
            })

            return response.json(doacao)

        } catch (error) {
            return response.status(400).json({
                message: 'Invalid request',
                error: error
            })
        }
    }
}