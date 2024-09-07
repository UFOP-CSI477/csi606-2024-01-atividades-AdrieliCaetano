import { prisma } from "../../database/client.js";

export class UpdateCidadeController {

    async handle(resquest, response) {

        const { id, nome, estado_id } = resquest.body

        // Validar o estado_id: model->estado

        const cidade = await prisma.cidade.update({
            where: {
                id: parseInt(id)
            },
            
            data: {
                nome,
                estado_id
            }
        })
        
        return response.json(cidade)

    }
}