import {Hono} from "https://deno.land/x/hono@v3.11.8/mod.ts"
import {PostController} from "./PostController.ts";

const app = new Hono({strict: false}).basePath("/api")

app.route('/posts', PostController)

Deno.serve(app.fetch)