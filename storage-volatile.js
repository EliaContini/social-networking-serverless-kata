/**
 * @module storage-volatile
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Volatile data layer: these implementation is volatile and data
 *      will be lost at every server restart.
 *      Used for development purposes.
 *
 */
const storage = () => {
    let store = {
        data: [],
        index: {},
    };

    const generateIndex = () => {
        store.index = {};

        let element = null;
        for (let i = 0; i < store.data.length; i++) {
            element = store.data[i];

            store.index[element._id] = i;
        }
    };

    return {
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
            const dateTime = new Date().getTime();
            const id = "id_" + dateTime;

            const post = {
                _id: id,
                createdAt: dateTime,
                message: params.message,
                username: params.username,
            };

            store.data.push(post);
            store.index[id] = store.data.length - 1;

            return post;
        },
        debug: () => {
            console.log("\n----------\n", store);
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
         * @param {string}  params.username - only post of username
         *
         * @returns
         */
        get: async (params) => {
            let data = [...store.data];

            if (params != null) {
                for (var key in params) {
                    switch (key) {
                        case "sortBy": {
                            const paramsSortBy = params[key];

                            const sortBy = (property, isDescending) => {
                                return function (elementA, elementB) {
                                    const valueA = elementA[property];
                                    const valueB = elementB[property];

                                    if (valueA > valueB) {
                                        return isDescending ? -1 : 1;
                                    }

                                    if (valueA < valueB) {
                                        return isDescending ? 1 : -1;
                                    }

                                    return 0;
                                };
                            };

                            data.sort(
                                sortBy(
                                    paramsSortBy.property,
                                    paramsSortBy.isDescending
                                )
                            );

                            break;
                        }
                        case "username": {
                            const paramsUsername = params[key];

                            data = data.filter((item) => {
                                if (item.username === paramsUsername) {
                                    return true;
                                }

                                return false;
                            });

                            break;
                        }
                        default: {
                        }
                    }
                }
            }

            return data;
        },
        /**
         * Remove a post
         *
         * @param {string} id - id of the post
         *
         * @returns {string} the id
         */
        remove: async (id) => {
            const index = store.index[id];

            if (index == null) {
                return id;
            }

            store.data.splice(index, 1);

            //regenerate index
            generateIndex();

            return id;
        },
    };
};

module.exports = storage;
