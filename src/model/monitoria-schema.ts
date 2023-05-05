import { z } from "zod";

export const monitoriaSchema = z.object({
    monitor: z.string().trim(),
    conteudo: z.string().trim(),
    data: z.coerce.date(),
    aluno: z.string().trim(),
    isOnline: z.boolean(),
    tags: z.array(z.string().trim()),
});
export type Monitoria = z.infer<typeof monitoriaSchema>;

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

