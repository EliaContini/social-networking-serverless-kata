/**
 * @module db
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Database module
 *
 */

"use strict";

const mongoose = require("mongoose");
const Post = require("./DbPostModel");

const db = (mongoUri) => {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return {
        close: () => {
            mongoose.connection.close();
        },
        /**
         * Create a post
         *
         * @param {object} params - parameters to create a post
         * @param {string} params.message - the post message
         * @param {string} params.username - the author of the message
         *
         * @returns {obejct} the post
         */
        create: async (params) => {
            const post = new Post({
                message: params.message,
                username: params.username,
            });

            return post.save();
        },
        /**
         * Get posts according to params
         *
         * @param {object}  params
         *
         * @param {object}  params.sortBy - sort constraints
         * @param {string}  params.sortBy.property - property to sort
         * @param {boolean} params.sortBy.isDescending - false for ascending,
         *      true for descending
         *
         * @param {string}  params.username - only posts of username
         *
         * @returns
         */
        get: async (params) => {
            let queryParams = {};
            let sortParams = {};

            if (params != null) {
                for (var key in params) {
                    switch (key) {
                        case "sortBy": {
                            const paramsSortBy = params[key];

                            sortParams[
                                paramsSortBy.property
                            ] = paramsSortBy.isDescending ? -1 : 1;

                            break;
                        }
                        case "username": {
                            const username = params[key];

                            queryParams["username"] = username;

                            break;
                        }
                    }
                }
            }

            return Post.find(queryParams).sort(sortParams);
        },
        /**
         * Remove a post
         *
         * @param {string} id - id of the post
         *
         * @returns {string} the id
         */
        remove: async (id) => {
            const result = await Post.findOneAndDelete({ _id: id });

            return id;
        },
    };
};

module.exports = db;
