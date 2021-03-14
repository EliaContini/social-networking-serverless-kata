/**
 * @module app.test
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Test suite for app
 *
 * @ignore
 *
 */
const build = require("./../app");
const { test } = require("tap");

const USERNAME = "test.suite";
const USERNAME_2 = "test.suite.2";

// #region ------------------------------------------------ testing routes (GET)
test('requests to "/":', async (t) => {
    const app = build();

    const response = await app.inject({
        method: "GET",
        url: "/",
    });

    t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8",
        "header content type must be application/json; charset=utf-8"
    );
    t.strictEqual(response.statusCode, 200, "returns a status code of 200");
});

test('requests to "/posts/":', async (t) => {
    const app = build();

    const response = await app.inject({
        method: "GET",
        url: "/posts/",
    });

    t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8",
        "header content type must be application/json; charset=utf-8"
    );
    t.strictEqual(response.statusCode, 200, "returns a status code of 200");
});
// #endregion ------------------------------------------------------------------

// #region --------------------------------------------- testing creation (POST)
test("create a post:", async (t) => {
    const app = build();

    const response = await app.inject({
        method: "POST",
        payload: {
            message: "My first post",
            username: USERNAME,
        },
        url: "/posts/",
    });

    t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8",
        "header content type must be application/json; charset=utf-8"
    );
    t.strictEqual(response.statusCode, 201, "returns a status code of 201");

    // cleanup
    const post = response.json();

    await app.inject({
        method: "DELETE",
        url: `/posts/${post._id}/`,
    });
});
// #endregion ------------------------------------------------------------------

// #region -------------------------------------------- testing removal (DELETE)
test("remove a post:", async (t) => {
    const app = build();

    const responseCreate = await app.inject({
        method: "POST",
        payload: {
            message: "My first post",
            username: USERNAME,
        },
        url: "/posts/",
    });

    const post = responseCreate.json();
    const postId = post._id;

    const response = await app.inject({
        method: "DELETE",
        url: `/posts/${postId}/`,
    });

    t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8",
        "header content type must be application/json; charset=utf-8"
    );
    t.strictEqual(response.statusCode, 200, "returns a status code of 200");
    t.deepEqual(
        response.json(),
        { removed: postId },
        `returns { "removed": "${postId}" }`
    );
});

test("remove an inexistent post with id=000000000000000000000000:", async (t) => {
    const app = build();

    const inexistentPostId = "000000000000000000000000";

    const response = await app.inject({
        method: "DELETE",
        url: `/posts/${inexistentPostId}/`,
    });

    t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8",
        "header content type must be application/json; charset=utf-8"
    );
    t.strictEqual(response.statusCode, 200, "returns a status code of 200");
    t.deepEqual(
        response.json(),
        { removed: inexistentPostId },
        `returns { "removed": "${inexistentPostId}" }`
    );
});
// #endregion ------------------------------------------------------------------

// #region ----------------------------------------------- testing queries (GET)
test(`lists posts of "${USERNAME}"`, async (t) => {
    const app = build();

    const responseCreate1 = await app.inject({
        method: "POST",
        payload: {
            message: "My first post",
            username: USERNAME,
        },
        url: "/posts/",
    });

    const responseCreate2 = await app.inject({
        method: "POST",
        payload: {
            message: "My first post",
            username: USERNAME_2,
        },
        url: "/posts/",
    });

    const responseCreate3 = await app.inject({
        method: "POST",
        payload: {
            message: "My second post",
            username: USERNAME,
        },
        url: "/posts/",
    });

    const response = await app.inject({
        method: "GET",
        url: `/posts/?username=${USERNAME}`,
    });

    t.strictEqual(
        response.headers["content-type"],
        "application/json; charset=utf-8",
        "header content type must be application/json; charset=utf-8"
    );
    t.strictEqual(response.statusCode, 200, "returns a status code of 200");
    t.deepEqual(response.json().length, 2, "length is equal to 2");

    // cleanup
    const post1 = responseCreate1.json();
    const post2 = responseCreate2.json();
    const post3 = responseCreate3.json();

    await app.inject({
        method: "DELETE",
        url: `/posts/${post1._id}/`,
    });

    await app.inject({
        method: "DELETE",
        url: `/posts/${post2._id}/`,
    });

    await app.inject({
        method: "DELETE",
        url: `/posts/${post3._id}/`,
    });
});
// #endregion ------------------------------------------------------------------
