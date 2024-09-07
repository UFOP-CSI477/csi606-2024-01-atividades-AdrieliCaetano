import { prisma } from "../../database/client.js";

export class GetByIdPessoaController {

    async handle(request, response) {

        const {id}  = request.params

        try {
            const pessoa = await prisma.pessoas.findFirstOrThrow({
                where: {
                    id: parseInt(id)
                },
                include: {
                    cidade: true,
                    tipo: true
                }
            })

            return response.json(pessoa)

        } catch (error) {
            return response.status(400).json(error)
        }
    }
}