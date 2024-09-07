import { prisma } from "../../database/client.js";

export class DeleteTipoController {

    async handle(request, response) {

        const {id} = request.body

        try {
            const tipo = await prisma.tipos_Sanguineos.delete({
                where: {
                    id
                }
            })

            return response.json(tipo)

        } catch (error) {
            return response.status(400).json(error)
        }
    }
}