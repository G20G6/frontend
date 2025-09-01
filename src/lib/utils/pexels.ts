import { PEXELS_API_KEY } from "$env/static/private";
import { createClient } from "pexels";


export const pexels = createClient(PEXELS_API_KEY);
