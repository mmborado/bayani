// .eleventy.js
const { execSync } = require("child_process");
const { DateTime } = require("luxon");
require("dotenv").config();

module.exports = function (eleventyConfig) {
  const pathPrefix = "/bayani/";

  eleventyConfig.addGlobalData("siteUrl", process.env.SITE_URL || "");

  // Watch your Tailwind entry
  eleventyConfig.addWatchTarget("src/styles/style.css");
  eleventyConfig.addWatchTarget("src/images");
  // Copy that file from src → _site so it's served at /styles/style.css
  eleventyConfig.addPassthroughCopy({
    "src/styles/style.css": "styles/style.css",
  });

  // (Plus any other static assets)
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy({ "src/scripts": "scripts" });

  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  return {
    pathPrefix,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
