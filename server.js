/**
 * @module server
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Project entry point
 *
 */
const server = require("./app")({
    logger: {
        level: "info",
    },
});

if (require.main === module) {
    const ADDRESS = "0.0.0.0";
    const PORT = process.env.PORT || 3000;

    server.listen(PORT, ADDRESS, (err, address) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
} else {
    module.exports = server;
}
