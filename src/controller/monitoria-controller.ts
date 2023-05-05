import type { Monitoria } from "../model/monitoria-schema"
import prismaClient from "../prisma-client"

export const create(monitoria: Monitoria) {
    return prismaClient.monitoria.create({
        data: {
            conteudo: monitoria.conteudo,
            data: monitoria.data,
            online: monitoria.isOnline,
            tags: {
                create: monitoria.tags.map(tag => ({ info: tag }))
            },
            monitor: { connect: { nome: monitoria.monitor } },
            
        }            
    });
}