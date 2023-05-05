import { z } from "zod";
import prismaClient from "../prisma-client";

export const Ano = ["1", "2", "3", "4"] as const;
export type Ano = typeof Ano[number];

export const Cursos = {
    DS: "Desenvolvimento de Sistemas",
    CC: "Edificações",
    ENF: "Enfermagem",
    GEO: "Geodésia",
    ME: "Mecânica",
    QP: "Qualidade"
} as const;
export type Cursos = typeof Cursos[keyof typeof Cursos];

export const Periodo = {
    DIURNO: "diurno",
    NOTURNO: "noturno",
    CT: "CT"
} as const;
export type Periodo = typeof Periodo[keyof typeof Periodo];

export const TurmaSchema = z.object({
    ano: z.enum(Ano),
    curso: z.nativeEnum(Cursos),
    periodo: z.nativeEnum(Periodo)
})
export type TurmaSchema = z.infer<typeof TurmaSchema>;

export const TurmaCodes = [ "1ºDSD", "2ºDSD", "3ºDSD", "1ºDSN", "2ºDSN", "3ºDSN", "4ºDSN", "1ºCCN", "2ºCCN", "3ºCCN", "4ºCCN", "1ºCCD", "2ºCCD", "3ºCCD", "4ºCCD", "1ºENF", "2ºENF", "3ºENF", "1ºGEO", "2ºGEO", "3ºGEO", "1ºMED", "2ºMED", "3ºMED", "1ºMEN", "2ºMEN", "3ºMEN", "4ºMEN", "1ºQPD", "2ºQPD", "3ºQPD", "1ºQPN", "2ºQPN", "3ºQPN", "4ºQPN", "1ºDSCT", "2ºDSCT", "1ºCCCT", "2ºCCCT", "1ºENFCT", "2ºENFCT", "1ºGEOCT", "2ºGEOCT", "1ºMECT", "2ºMECT", "1ºQPCT", "2ºQPCT", ] as const;
export type TurmaCode = typeof TurmaCodes[number];

export const turmas = {
    "1ºDSD": { ano: "1", curso: "Desenvolvimento de Sistemas", periodo: "diurno" },
    "2ºDSD": { ano: "2", curso: "Desenvolvimento de Sistemas", periodo: "diurno" },
    "3ºDSD": { ano: "3", curso: "Desenvolvimento de Sistemas", periodo: "diurno" },

    "1ºDSN": { ano: "1", curso: "Desenvolvimento de Sistemas", periodo: "noturno" },
    "2ºDSN": { ano: "2", curso: "Desenvolvimento de Sistemas", periodo: "noturno" },
    "3ºDSN": { ano: "3", curso: "Desenvolvimento de Sistemas", periodo: "noturno" },
    "4ºDSN": { ano: "4", curso: "Desenvolvimento de Sistemas", periodo: "noturno" },

    "1ºCCD": { ano: "1", curso: "Edificações", periodo: "diurno" },
    "2ºCCD": { ano: "2", curso: "Edificações", periodo: "diurno" },
    "3ºCCD": { ano: "3", curso: "Edificações", periodo: "diurno" },

    "1ºENF": { ano: "1", curso: "Enfermagem", periodo: "diurno" },
    "2ºENF": { ano: "2", curso: "Enfermagem", periodo: "diurno" },
    "3ºENF": { ano: "3", curso: "Enfermagem", periodo: "diurno" },

    "1ºGEO": { ano: "1", curso: "Geodésia", periodo: "diurno" },
    "2ºGEO": { ano: "2", curso: "Geodésia", periodo: "diurno" },
    "3ºGEO": { ano: "3", curso: "Geodésia", periodo: "diurno" },

    "1ºMED": { ano: "1", curso: "Mecânica", periodo: "diurno" },
    "2ºMED": { ano: "2", curso: "Mecânica", periodo: "diurno" },
    "3ºMED": { ano: "3", curso: "Mecânica", periodo: "diurno" },

    "1ºMEN": { ano: "1", curso: "Mecânica", periodo: "noturno" },
    "2ºMEN": { ano: "2", curso: "Mecânica", periodo: "noturno" },
    "3ºMEN": { ano: "3", curso: "Mecânica", periodo: "noturno" },

    "1ºQPD": { ano: "1", curso: "Qualidade", periodo: "diurno" },
    "2ºQPD": { ano: "2", curso: "Qualidade", periodo: "diurno" },
    "3ºQPD": { ano: "3", curso: "Qualidade", periodo: "diurno" },

    "1ºQPN": { ano: "1", curso: "Qualidade", periodo: "noturno" },
    "2ºQPN": { ano: "2", curso: "Qualidade", periodo: "noturno" },
    "3ºQPN": { ano: "3", curso: "Qualidade", periodo: "noturno" },

    "1ºDSCT": { ano: "1", curso: "Desenvolvimento de Sistemas", periodo: "CT" },
    "2ºDSCT": { ano: "2", curso: "Desenvolvimento de Sistemas", periodo: "CT" },

    "1ºQPCT": { ano: "1", curso: "Qualidade", periodo: "CT" },
    "2ºQPCT": { ano: "2", curso: "Qualidade", periodo: "CT" },

    "1ºCCCT": { ano: "1", curso: "Edificações", periodo: "CT" },
    "2ºCCCT": { ano: "2", curso: "Edificações", periodo: "CT" },

    "1ºENFCT": { ano: "1", curso: "Enfermagem", periodo: "CT" },
    "2ºENFCT": { ano: "2", curso: "Enfermagem", periodo: "CT" },

    "1ºGEOCT": { ano: "1", curso: "Geodésia", periodo: "CT" },
    "2ºGEOCT": { ano: "2", curso: "Geodésia", periodo: "CT" },

    "1ºMEDCT": { ano: "1", curso: "Mecânica", periodo: "CT" },
    "2ºMEDCT": { ano: "2", curso: "Mecânica", periodo: "CT" }
} as const;
export type TurmaCode = keyof typeof turmas;
