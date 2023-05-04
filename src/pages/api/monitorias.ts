import type { APIRoute  } from 'astro';
import { get } from '../../connection'
import { rowToMonitoria } from '../../model/monitoria';

export const all: APIRoute = async() => {
    try {
        const res = await get("'Respostas ao formulário 1'!C2:M") as string[][];
        const monitorias = res.map(rowToMonitoria);

        console.log(`Sending ${monitorias?.length} rows`);
        
        return new Response(JSON.stringify(monitorias), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);

        return {
            status: 500,
            body: 'Internal Server Error'
        }
    }
}

