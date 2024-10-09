import ICidade from "./ICidade";
import ITipo from "./ITipo";

export default interface IPessoa {
    id: number;
    nome: string;
    rua: string;
    numero: string;
    complemento: string;
    rg: string;
    created_at: string
    updated_at: string

    cidade: ICidade;
    tipo: ITipo;

}
