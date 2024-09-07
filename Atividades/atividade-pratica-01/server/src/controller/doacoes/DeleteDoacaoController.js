import { prisma } from "../../database/client.js";

export class DeleteDoacaoController {

    async handle(request, response) {
        
        const { id } = request.body

        try {

            const doacao = await prisma.doacoes. delete({
                where: {
                    id: parseInt(id)
                }
            })

            return response.json(doacao)

        } catch (error) {
            return response.status(400).json({
                message: 'Invalid resquest',
                error
            })
        }
    }
}