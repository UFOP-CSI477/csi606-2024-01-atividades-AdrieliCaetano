import ILocal from "./ILocal";
import IPessoa from "./IPessoa";

export default interface IDoacao {
    id: number;
    data: string;
    created_at: string;
    updated_at: string;

    pessoa: IPessoa;
    local: ILocal;

}