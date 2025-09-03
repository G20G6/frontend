import type { PageServerLoad } from "../chat/$types";
import { getDashboardUser } from "./data/controller.svelte";

export const load: PageServerLoad = async () => {
    const user = getDashboardUser('business');
    console.log(user);
    return { user };
};