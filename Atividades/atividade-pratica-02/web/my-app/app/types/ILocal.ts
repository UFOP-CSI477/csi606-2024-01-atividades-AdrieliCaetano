import ICidade from "./ICidade";

export default interface ILocal{
    id: number;
    nome: string;
    rua: string;
    numero: string;
    complemento: string;
    created_at: string;
    updated_at: string;

    cidade: ICidade;
}
