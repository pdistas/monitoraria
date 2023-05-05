import { z } from "zod";
import { TurmaCodes, TurmaSchema, turmas } from "./turma-model";

export const AlunoSchema = z.object({
    nome: z.string(),
    ra: z.number(),
    turma: z.enum(TurmaCodes)
});
export type Aluno = z.infer<typeof AlunoSchema>;
