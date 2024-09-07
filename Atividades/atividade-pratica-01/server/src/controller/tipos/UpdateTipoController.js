import { prisma } from "../../database/client.js";

export class UpdateTipoController {

    async handle(request, response) {

        const { id, tipo, fator } = request.body

        const tipossanguineo = await prisma.tipos_Sanguineos.update({
            data: {
                tipo,
                fator,
            },

            where: {
                id
            }
        })

        return response.json(tipossanguineo)

    }
}