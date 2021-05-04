/**
 * @module DbPostModel
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description MongoDB model for posts
 *
 */

"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        message: {
            type: String,
        },
        username: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
