import { prisma } from "../../database/client.js";

export class UpdateLocalController {

    async handle(request,response){

        const { id,nome, rua, numero, complemento, cidade_id } = request.body

        try {
            
            const local = await prisma.locais_Coleta.update({
                where: {
                    id: parseInt(id)
                },

                data: {
                    nome,
                    rua,
                    numero,
                    complemento,
                    cidade_id
                }
            })

            return response.json(local)

        } catch (error) {
            return response.status(400).json(error)
        }

    }
}