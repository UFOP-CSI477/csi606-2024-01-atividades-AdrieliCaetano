import IUsuario from "./IUsuario"
import IDisciplina from "./IDisciplina"

interface IAtividade {
    id: number
    titulo: string
    descricao: string
    data: Date
    tipo: string
    status: boolean
    usuario: IUsuario
    disciplina: IDisciplina
}

export default IAtividade