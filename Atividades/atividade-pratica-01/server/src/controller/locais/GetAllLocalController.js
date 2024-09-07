import { prisma } from "../../database/client.js";

export class GetAllLocalController {

    async handle(request, response) {

        const locais = await prisma.locais_Coleta.findMany({
            include: {
                cidade: true
            }
        })

        return response.json(locais)
        
    }
}