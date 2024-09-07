import { prisma } from "../../database/client.js";

export class UpdateDoacaoController {

    async handle(request, response) {

        const { id, pessoa_id, local_id, data } = request.body

        try {
            const doacao = await prisma.doacoes.update({
                where: {
                    id: parseInt(id)
                },
    
                data: {
                    data,
                    pessoa_id,
                    local_id
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