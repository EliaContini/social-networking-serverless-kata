/**
 * @module app
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Application
 *
 */
require("dotenv").config();

const fastify = require("fastify");
const storage = require("./storage");

const db = storage(process.env.MONGO_URI);

function build(opts = {}) {
    const app = fastify(opts);
    // -------------------------------------------------------------- ping route
    app.get("/", async function (request, reply) {
        const info = {
            appName: "Social networking serverless kata",
            status: "running",
            version: "1.0.0",
        };

        return reply.send(info);
    });
    // ------------------------------------------------------------------- posts
    app.get("/posts/", async (request, reply) => {
        var params = {
            sortBy: {
                isDescending: true,
                property: "createdAt",
            },
        };

        const query = request.query;
        if ("username" in query && query.username.trim() !== "") {
            params.username = query.username;
        }

        const posts = await db.get(params);

        return reply.send(posts);
    });

    app.post("/posts/", async (request, reply) => {
        //
        // should be sanitized
        //
        const params = request.body;

        const post = await db.create(params);

        return reply.status(201).send(post);
    });

    app.delete("/posts/:id/", async (request, reply) => {
        const id = request.params.id;

        const removedId = await db.remove(id);

        return reply.send({ removed: removedId });
    });

    return app;
}

module.exports = build;
