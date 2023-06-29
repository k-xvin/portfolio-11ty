const fs = require("fs");
const format = require('date-fns/format');
const NOT_FOUND_PATH = "public/404.html";
const Image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/sass/");

    eleventyConfig.addPassthroughCopy("./src/img/favicon.ico");
    eleventyConfig.addPassthroughCopy("./src/img/nightsky2.png");
    // eleventyConfig.addPassthroughCopy("./src/img/svg/");

    eleventyConfig.addFilter('log', value => {
        console.log(value)
    })

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
        widths: [600],
        formats: ["avif", "jpeg"],
        outputDir: "public/img"
    });

    let imageAttributes = {
        alt,
        //   sizes,
        sizes: "100vw",
        loading: "lazy",
        decoding: "async",
        sharpJpegOptions: {
            mozjpeg: true
        }
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
}

// synchronous shortcode for generating post icons
function imageIconShortcode(src, alt){
    let options = {
        widths: [150],
        formats: ["avif", "jpeg"],
        outputDir: "public/img"
    };
    
    
    Image(src, options);

    let imageAttributes = {
        alt,
        sizes: "100px",
        loading: "lazy",
        decoding: "async",
        sharpJpegOptions: {
            mozjpeg: true
        }
    };

    let metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
}