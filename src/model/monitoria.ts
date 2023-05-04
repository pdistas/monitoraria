import { z } from "zod";
import monitores from "../database/monitores";
import departamentos from "../database/departamentos";

export type Curso = "Mecânica" | "Geodésia" | "Desenvolvimento de Sistemas" | "Edificações" | "Qualidade" | "Enfermagem";

const Periodos = ["diurno", "noturno", "ct"] as const;

const periodoSchema = z.preprocess((x) => {
    return Periodos.find((periodo) => periodo.toLowerCase().startsWith((x as string).toLowerCase()));
}, z.enum(Periodos).optional());

const cursoSchema = z.preprocess((x) => {
    return departamentos.find((curso) => curso.toLowerCase().startsWith((x as string).toLowerCase()));
}, z.enum(departamentos).optional());

const toNumber = z.preprocess((x) => {
    const val = parseInt((x as string).replace(/[^0-9]/g, "") ?? "");
    return isNaN(val) ? null : val;
}, z.number().int().optional().nullable());

const turmaSchema = z.object({
    curso: z.enum(departamentos).nullable().default(null),
    ano: toNumber.nullable().default(null),
    periodo: periodoSchema.nullable().default(null)
});

const alunoSchema = z.object({
    nome: z.string().trim().nullable().default(null),
    ra: toNumber.nullable().default(null),
    turma: turmaSchema.nullable().default(null)
});

const monitoriaSchema = z.object({
    monitor: turmaSchema.nullable().default(null),
    conteudo: z.string().trim().nullable().default(null),
    data: z.string().transform(dateParser).nullable().default(null),
    aluno: alunoSchema.nullable().default(null),
    isOnline: z.boolean().default(false).nullable().default(null),
    modalidade: z.array(z.string().trim()).default([])
});

export type Monitoria = z.infer<typeof monitoriaSchema>;

export function rowToMonitoria(row: string[]): Monitoria {
    const monitoria = {
        monitor: monitores.get(row[0]?.split("-")[0]?.trim() ?? "") ?? undefined,
        conteudo: row[3],
        data: row[1],
        aluno: {
            nome: row[4],
            ra: row[8],
            turma: {
                curso: row[6],
                ano: row[5],
                periodo: row[7]?.trim().toLowerCase()
            }
        },
        isOnline: row[9] === "Online",
        modalidade: row[10]?.split(",") ?? []
    };

    return monitoriaSchema.parse(monitoria);
}

function dateParser(dateToParse: string): Date {
    if (new Date(dateToParse).toString() !== "Invalid Date") {
        return new Date(dateToParse);
    }

    const [date, time] = dateToParse.split(" ");

    const [day, month, year] = dateToParse.split("/");
    const [hour, minute] = dateToParse.split(":");

    if (!day || !month || !year || !hour || !minute) {
        return new Date("Invalid Date");
    }

    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
}
