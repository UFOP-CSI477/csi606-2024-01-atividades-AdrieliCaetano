import { prisma } from "../../database/client.js"

export class CreatePessoaController {

    async handle(request, response) {


        const { nome, rua, numero, complemento, rg, cidade_id, tipo_id } = request.body

        if (nome ==="" || rg === "" || !rg || !nome) {
            return response.status(400).json({
                message: 'Invalid data! Nome and rg are required.'
            })
        }

        try {
            await prisma.tipos_Sanguineos.findFirstOrThrow({
                where: {
                    id: parseInt(tipo_id)
                }
            })

            await prisma.cidade.findFirstOrThrow({
                where: {
                    id: parseInt(cidade_id)
                }
            })

            const pessoa = await prisma.pessoas.create({
                data: {
                    nome,
                    rua,
                    numero,
                    complemento,
                    rg,
                    cidade: {
                        connect: {
                            id: parseInt(cidade_id)
                        }
                    },
                    tipo: {
                        connect: {
                            id: parseInt(tipo_id)
                        }
                    }
                }
            })

            return response.json(pessoa)

        } catch (error) {
            return response.json(error)
        }



    }
}