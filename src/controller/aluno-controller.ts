import type { Aluno } from "../model/aluno-schema";
import prismaClient from "../prisma-client";

export function create(aluno: Aluno) {
    return prismaClient.aluno.create({
        data: {
            ...aluno,
            turma: { connect: { code: aluno.turma } }
        }
    });
}
