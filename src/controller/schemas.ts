import { Curso, Departamento, Periodo, Turma } from "@prisma/client";
import { z } from "zod";

export const turmaSchema = z.object({
    ano: z.coerce.number().int().min(1).max(4),
    periodo: z.nativeEnum(Periodo),
    curso: z.nativeEnum(Curso)
});

export const monitorSchema = z.object({
    nome: z.string().nonempty(),
    departamento: z.nativeEnum(Departamento),
});

export const alunoSchema = z.object({
    nome: z.string().nonempty(),
    ra: z.string().regex(/^20[0-3][0-9]{3}$/, { message: "RA inválido" }),
    turma: turmaSchema,
});

export const monitoriaSchema = z.object({
    conteudo: z.string().nonempty(),
    data: z.coerce.date(),
    online: z.boolean(),
    turma: turmaSchema,
    monitor: monitorSchema,
    alunos: z.array(alunoSchema),
})

