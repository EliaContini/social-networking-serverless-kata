/**
 * Handler for posts functions
 *
 * Author: Elia Contini <https://elia.contini.page/>
 *
 */

"use strict";

const database = require("./../database");

const CONTENT_TYPE = "application/json";

const db = database(process.env.MONGODB_URI);

module.exports.create = async (event, context) => {
   //
   // should be sanitized
   //
   const params = JSON.parse(event.body);

   const post = await db.create(params);

   return {
      body: JSON.stringify(post),
      headers: { "content-type": CONTENT_TYPE },
      statusCode: 201,
   };
};

module.exports.delete = async (event, context) => {
   const id = event.pathParameters.id;

   const removedId = await db.remove(id);

   return {
      body: JSON.stringify({ removed: removedId }),
      headers: { "content-type": CONTENT_TYPE },
      statusCode: 200,
   };
};

module.exports.get = async (event, context) => {
   var params = {
      sortBy: {
         isDescending: true,
         property: "createdAt",
      },
   };

   const query = event.queryStringParameters;
   if (query) {
      if ("username" in query && query.username.trim() !== "") {
         params.username = query.username;
      }
   }

   const posts = await db.get(params);

   return {
      body: JSON.stringify(posts),
      headers: { "content-type": CONTENT_TYPE },
      statusCode: 200,
   };
};
