import { prisma } from "../../database/client.js";

export class GetAllPessoaController {

    async handle(request, response){

        const pessoas = await prisma.pessoas.findMany({
            include: {
                cidade: true,
                tipo: true
            }
        })

        return response.json(pessoas)

    }
}