import { z } from "zod";

export const Departamento = {
    PD: "Desenvolvimento de Sistemas",
    QUALIDADE: "Qualidade",
    MECANICA: "Mecânica",
    GEO: "Geodésia",
    EDIF: "Edificações",
    ENF: "Enfermagem",
    CIENTIFICAS: "Científicas",
    EXATAS: "Exatas",
    HUMANAS: "Humanas",
} as const;
export type Departamento = typeof Departamento[keyof typeof Departamento];

export const monitorSchema = z.object({
    nome: z.string().trim(),
    departamento: z.nativeEnum(Departamento)
})
