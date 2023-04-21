import type { Departamento } from "./departamentos";

export type Monitor = {
    nome: string;
    departamento: Departamento;
    ra: number;
}

export const monitores: Monitor[] = [
    {
        nome: "Nagasse",
        departamento: "Mecânica",
        ra: 201343
    },
    {
        nome: "Ricardo",
        departamento: "PD",
        ra: 201605
    },
    {
        nome: "Catarina",
        departamento: "Exatas",
        ra: 201171
    },
    {
        nome: "Meida",
        departamento: "PD",
        ra: 201290
    }
]

export default new Map(monitores.map(monitor => [monitor.nome, monitor]))
