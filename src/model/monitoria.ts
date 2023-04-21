import type { Monitor } from "../database/monitores";
import monitores from "../database/monitores";

export type Periodo = "diurno" | "noturno" | "CT";
export type Curso = "Mecânica" | "Geodésia" | "Desenvolvimento de Sistemas" | "Edificações" | "Qualidade" | "Enfermagem";

export type Turma = {
    curso: Curso | null;
    ano: 1 | 2 | 3 | 4 | null;
    periodo: Periodo | null;
}

export type Aluno = {
    nome: string | null;
    ra: number | null;
    turma: Turma | null;
}

export type MonitoriaDTO = {
    monitor: Monitor | null;
    conteudo: string | null;
    data: Date | null;
    aluno: Aluno | null;
    isOnline: boolean | null;
    modalidade?: string[];
}

export class Monitoria {
    monitor: Monitor;
    conteudo: string;
    data: Date;
    aluno: Aluno;
    isOnline: boolean;
    modalidade: string[];

    constructor({ monitor, conteudo, data, aluno, isOnline, modalidade }: Monitoria) {
        this.monitor = monitor;
        this.conteudo = conteudo;
        this.data = data;
        this.aluno = aluno;
        this.isOnline = isOnline;
        this.modalidade = modalidade;
    }

    static fromRow(row: string[]): MonitoriaDTO {
        let monitorNome = row[0]?.split("-")[0]?.trim();
        let monitor: Monitor | undefined = monitores.get(monitorNome ?? "");

        let date: Date = new Date(row[2] ? row[1] as string + " " + row[2] : row[1] as string);

        if (date.toString() === "Invalid Date") {
            let [day, time] = row[1] ? row[1].split(" ") : [];
            time ??= row[2];
            date = stringToDate(day ?? "", time ?? "");
        }

        let periodo: Periodo | undefined;
        if (row[7]?.toLowerCase().includes("diurno")) {
            periodo = "diurno";
        } else if (row[7]?.toLowerCase().includes("noturno")) {
            periodo = "noturno";
        } else if (row[7]?.toLowerCase().includes("ct")) {
            periodo = "CT";
        } else {
            periodo = undefined;
        }

        let isOnline: boolean | null = null;
        if (row[9] && row[9].toLowerCase().trim() === "online") {
            isOnline = true;
        } else if (row[9] && row[9].toLowerCase().trim() === "presencial") {
            isOnline = false;
        }

        let res = {
            monitor: monitor ?? null,
            data: date.toString() === "Invalid Date" ? null : date,
            conteudo: row[3]?.trim() ?? null,
            aluno: {
                nome: row[4]?.trim() ?? "",
                ra: row[8] ?? null,
                turma: {
                    ano: row[5]?.trim().charAt(0) ?? null,
                    curso: row[6] ?? null,
                    periodo: periodo ?? null
                } as Turma
            } as Aluno,
            isOnline: isOnline,
        } as MonitoriaDTO;

        if (row[10]) {
            res.modalidade = row[10].split(",").map(m => m.trim());
        }

        return res;
    }
}

function stringToDate(date: string, time: string): Date {
    const [day, month, year] = date.split("/");
    const [hour, minute] = time.split(":");

    if (!day || !month || !year || !hour || !minute) {
        return new Date("Invalid Date");
    }

    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
}
