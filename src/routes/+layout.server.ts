import type { PageServerLoad } from "./(main)/chat/$types";

export const load: PageServerLoad = async ({url}) => {
    console.log("GET: ", url.pathname);
};