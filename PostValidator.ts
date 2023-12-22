import { validator } from "https://deno.land/x/hono@v3.11.8/mod.ts";
import {Post} from "./Post.ts";

export const addPostValidator = validator("json", (value, c) => {
    const body = value as Post
    // blablabla, 't is goed hoor

    return {body}
})