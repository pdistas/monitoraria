const cursos = [
  "Mecânica",
  "Geodésia",
  "Desenvolvimento de Sistemas",
  "Edificações",
  "Qualidade",
  "Enfermagem",
] as const;

const anos = [1, 2, 3, 4] as const;

const periodos = ["diurno", "noturno", "CT"] as const;

export type Curso = (typeof cursos)[number];
export type Ano = (typeof anos)[number];
export type Periodo = (typeof periodos)[number];

export type Turma = {
  curso: Curso;
  ano: Ano;
  periodo: Periodo;
};

export interface TurmaDTO {
  curso: Curso | null;
  ano: Ano | null;
  periodo: Periodo | null;
}

export function toCurso(curso: string | undefined | null): Curso | null {
  if (!curso) return null;

  const fmtCurso = curso.trim().toLowerCase();
  return cursos.find((c) => fmtCurso.includes(c.toLowerCase())) ?? null;
}

export function toAno(ano: string | undefined | null): Ano | null {
  if (!ano) return null;

  const anoInt = parseInt(ano.trim().charAt(0));
  return anos.find((a) => anoInt === a) ?? null;
}

export function toPeriodo(value: string | undefined | null): Periodo | null {
  if (!value) return null;

  const fmtPeriodo = value.trim().toLowerCase();
  return periodos.find((p) => fmtPeriodo.includes(p.toLowerCase())) ?? null;
}

export function toOnline(
  value: string | undefined | null
): "online" | "presencial" | null {
  if (!value) return null;

  const fmtValue = value.trim().toLowerCase();

  if (fmtValue.includes("online")) return "online";
  else if (fmtValue.includes("presencial")) return "presencial";
  else return null;
}

export function convertDate(value: string | undefined | null): Date | null {
  if (!value) return null;
  else {
    let date: Date = new Date(value);
    if (date.toString() !== "Invalid Date") return date;
  }

  const [date, time] = value.split(/[\sT]/);

  if (!date) return null;

  let [day, month, year] = date.split("/");
  let [hour, minute, seconds] = time?.split(":") ?? [
    undefined,
    undefined,
    undefined,
  ];

  if (year?.length === 2) year = "20" + year;

  const dateObj = new Date(
    parseInt(year ?? "0"),
    parseInt(month ?? "1") - 1,
    parseInt(day ?? "0"),
    parseInt(hour ?? "0"),
    parseInt(minute ?? "0"),
    parseInt(seconds ?? "0")
  );

  return dateObj.toString() === "Invalid Date" ? null : dateObj;
}
