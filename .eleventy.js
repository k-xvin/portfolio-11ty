const fs = require("fs");
const format = require('date-fns/format');
const NOT_FOUND_PATH = "public/404.html";
const Image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/sass/");

    eleventyConfig.addPassthroughCopy("./src/img/favicon.ico");

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
        return dateObj.toLocaleDateString("en-US", { timeZone: "UTC" });
    });

    //date for xml
    eleventyConfig.addFilter('date', function (date, dateFormat) {
        return format(date, dateFormat)
    });

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addNunjucksShortcode("icon", imageIconShortcode);

    return {
        markdownTemplateEngine: 'njk',
        dir: {
            input: "src",
            output: "public",
        },
    };
};

// https://www.aleksandrhovhannisyan.com/blog/eleventy-image-plugin/
// https://www.10ty.dev/docs/plugins/image/
async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
        widths: [300, 600, "auto"],
        formats: ["avif", "jpeg"],
        outputDir: "public/img"
    });

    let imageAttributes = {
        alt,
        //   sizes,
        sizes: "100vw",
        loading: "lazy",
        decoding: "async",
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
}

// synchronous shortcode for generating post icons
function imageIconShortcode(src, alt){
    let options = {
        widths: [200],
        formats: ["webp", "jpeg"],
        outputDir: "public/img"
    };
    
    
    Image(src, options);

    let imageAttributes = {
        alt,
        sizes: "100px",
        loading: "lazy",
        decoding: "async",
    };

    let metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
}