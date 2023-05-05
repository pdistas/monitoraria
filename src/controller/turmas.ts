import { Curso, Periodo } from "@prisma/client";
import { turmaSchema } from "./schemas";
import type { z } from "zod";

const cursoMap: Map<string, Curso> = new Map([
    ["PD", Curso.DS],
    ["QP", Curso.Qualidade],
    ["ME", Curso.Mecanica],
    ["CC", Curso.Edificacoes],
    ["ENF", Curso.Enfermagem]
]);

const periodoMap: Map<string, Periodo> = new Map([
    ["D", Periodo.Diurno],
    ["N", Periodo.Noturno],
    ["CT", Periodo.CT]
]);

const ctRegex = /^[1-4]ºCT-(PD|ENF)$/
const enfRegex = /^[1-4]ºENF$/

type Turma = z.infer<typeof turmaSchema>;

export function parseTurma(turma: string): Turma {
    if (turma.match(ctRegex)) {
        const [ano, curso] = turma.split("ºCT-");
        return turmaSchema.parse({
            ano: parseInt(ano!),
            periodo: Periodo.CT,
            curso: cursoMap.get(curso!)
        });
    } else if (turma.match(enfRegex)) {
        const [ano] = turma.split("ºENF");
        return turmaSchema.parse({
            ano: parseInt(ano!),
            periodo: Periodo.Diurno,
            curso: Curso.Enfermagem
        });
    } else {
        const [ano, ...pericurso] = turma.split("");
        const [periodo, curso] = pericurso.slice(-1);

        return turmaSchema.parse({
            ano: parseInt(ano!),
            periodo: periodoMap.get(periodo!),
            curso: cursoMap.get(curso!)
        });
    }
}
