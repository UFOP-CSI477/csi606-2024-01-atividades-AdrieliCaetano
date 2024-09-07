import { prisma } from "../../database/client.js";

export class CreateTipoController {

    async handle(request, response){

        const { tipo, fator } = request.body

        if (tipo ==="" || fator ==="" || !tipo || !fator) {
            return response.status(400).json({
                message: 'Invalid data! Tipo an fator are required.'
            })
        }

        const tiposanguineo = await prisma.tipos_Sanguineos.create({
            data: {
                tipo,
                fator
            }
        })

        return response.status(201).json(tiposanguineo)

    }
}