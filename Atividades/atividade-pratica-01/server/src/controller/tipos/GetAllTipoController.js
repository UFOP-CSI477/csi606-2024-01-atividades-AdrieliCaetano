import { prisma } from "../../database/client.js";

export class GetAllTipoController {

    async handle(request, response) {

        const tipos = await prisma.tipos_Sanguineos.findMany()

        return response.json(tipos)

    }
}