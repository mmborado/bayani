// .eleventy.js
const { execSync } = require("child_process");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Watch your Tailwind entry
  eleventyConfig.addWatchTarget("src/styles/style.css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Copy that file from src → _site so it's served at /styles/style.css
  eleventyConfig.addPassthroughCopy({
    "src/styles/style.css": "styles/style.css",
  });

  // (Plus any other static assets)
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");

  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
