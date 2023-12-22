import {Hono} from "https://deno.land/x/hono@v3.11.8/hono.ts";
import {addPostValidator} from "./PostValidator.ts";
import {Post} from "./Post.ts";

const PostController = new Hono()
const kv = await Deno.openKv()

PostController.get("/", async (c) => {
    const list = await kv.list({prefix: ["posts"]})
    const posts: Post[] = []
    for await (const r of list) {
        posts.push(r.value as Post)
    }
    return c.json(posts)
})
PostController.get("/:id", async (c) => {
    const {id} = c.req.param()
    const post = await kv.get(["posts", id])
    return c.json(post)
})
PostController.delete("/:id", async (c) => {
    const {id} = c.req.param()
    await kv.delete(["posts", +id])
    return c.json({success: id})
})
PostController.post("/", addPostValidator, async (c) => {
    const {body} = c.req.valid("json")
    const post = body // obviously, need to create one
    post.id = Date.now()

    kv.set(["posts", post.id], post)

    return c.json({message: "Post succesfully created", post: post})
})

export {PostController}