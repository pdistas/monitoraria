import { APIRoute } from "astro";
import prismaClient from "../../../prisma-client";
import { monitoriaSchema } from "../../../controller/schemas";

export const get: APIRoute = async({ request }) => {
    const body = await request.json();

    
}
