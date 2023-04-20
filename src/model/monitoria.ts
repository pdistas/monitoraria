import type { Departamento } from "../database/departamentos";

export class Monitoria {
    monitor: Monitor;
    conteudo: string;
    data: Date;

    constructor(monitor: Monitor | undefined, conteudo: string, data: Date) {
        this.monitor = monitor || { nome: "Nagasse", departamento: "Mecânica", ra: 201343 };
        this.conteudo = conteudo;
        this.data = data;
    }
}
