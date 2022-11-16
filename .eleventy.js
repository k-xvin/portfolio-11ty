const fs = require("fs");
const { DateTime } = require("luxon");
const NOT_FOUND_PATH = "public/404.html";

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/sass/");

    eleventyConfig.addPassthroughCopy("./src/img");

    eleventyConfig.addFilter('log', value => {
        console.log(value)
    })

    // For error page while running browsersync
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {

                bs.addMiddleware("*", (req, res) => {
                    if (!fs.existsSync(NOT_FOUND_PATH)) {
                        throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
                    }

                    const content_404 = fs.readFileSync(NOT_FOUND_PATH);
                    // Add 404 http status code in request header.
                    res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            }
        }
    });

    // date
    // https://www.bockensm.com/2021/03/13/javascript-dates-off-by-one/
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return dateObj.toLocaleDateString( "en-US", { timeZone: "UTC" } );
    });

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};
