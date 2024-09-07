import { json } from "express";
import { prisma } from "../../database/client.js";

export class CreateDoacaoController {

    async handle(request,response) {

        const { pessoa_id, local_id, data } = request.body

        try {
            await prisma.locais_Coleta.findFirstOrThrow({
                where: {
                    id: parseInt(local_id)
                }
            })

            await prisma.pessoas.findFirstOrThrow({
                where: {
                    id: parseInt(pessoa_id)
                }
            })

            const doacao = await prisma.doacoes.create({
                data: {
                    data,
                    pessoa: {
                        connect: {
                            id: parseInt(pessoa_id)
                        }
                    },
                    local: {
                        connect: {
                            id: parseInt(local_id)
                        }
                    }
                }
            })

            return response.json(doacao)

        } catch (error) {
            return response.status(400).json({
                message: 'Invalid resquest',
                error
            })
        }
    }
}