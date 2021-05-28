/**
 * @module database.test
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Test for db module
 *
 */

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { test } = require("tap");

const database = require("./../database");

const mongoServer = new MongoMemoryServer();
mongoose.Promise = Promise;

const posts = [
    {
        message: "First post",
        username: "elia.contini",
    },
    {
        message: "First post",
        username: "alice",
    },
    {
        message: "First post",
        username: "bob",
    },
    {
        message: "Second post",
        username: "elia.contini",
    },
];

test("", async (t) => {
    return mongoServer.getUri().then(async (mongoUri) => {
        const db = database(mongoUri);

        const populateDb = async () => {
            for (let i = 0; i < posts.length; i++) {
                await db.create(posts[i]);
            }
        };
        await populateDb();

        t.test("Get posts", async (t) => {
            const response = await db.get();

            const cardinality = posts.length;

            t.same(
                response.length,
                cardinality,
                "returns an array of " + cardinality
            );
        });

        t.test("Get posts filtered by username", async (t) => {
            const response = await db.get({ username: "elia.contini" });

            t.same(response.length, 2, "2 posts");
        });

        t.test("Get posts sorted by createdAt ascending", async (t) => {
            const cardinality = posts.length;

            const response = await db.get({
                sortBy: {
                    isDescending: false,
                    property: "createdAt",
                },
            });

            t.same(response.length, cardinality, "returns sorted posts");
        });

        t.test("Get posts sorted by createdAt descending", async (t) => {
            const cardinality = posts.length;

            const response = await db.get({
                sortBy: {
                    isDescending: true,
                    property: "createdAt",
                },
            });

            t.same(response.length, cardinality, "returns sorted posts");
        });

        t.test("Create post", async (t) => {
            const post = {
                message: "First post",
                username: "elia.contini",
            };

            const response = await db.create(post);

            t.same(response.message, post.message, "returns the post created");
        });

        t.test("Remove post", async (t) => {
            const post = {
                message: "First post",
                username: "elia.contini",
            };

            const responseCreate = await db.create(post);

            const removed = await db.remove(responseCreate._id);

            t.same(removed._id, responseCreate._id, "returns the removed post");
        });

        t.teardown(async () => {
            db.close();

            mongoServer.stop();
        });
    });
});
