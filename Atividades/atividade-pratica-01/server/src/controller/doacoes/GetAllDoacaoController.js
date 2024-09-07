import { prisma } from "../../database/client.js";

export class GetAllDoacaoController {

    async handle(request, response) {

        const doacoes = await prisma.doacoes.findMany({
            include:{
                pessoa: true,
                local: true
            }
        })

        return response.json(doacoes)
        
    }
}