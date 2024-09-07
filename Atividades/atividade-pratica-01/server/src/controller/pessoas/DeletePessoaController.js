import { prisma } from "../../database/client.js";

export class DeletePessoaController {

    async handle(request, response) {

        const {id} = request.body

        try {
            const pessoa = await prisma.pessoas.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return response.json(pessoa)

        } catch (error) {
            return response.status(400).json(error)
        }
    }
}