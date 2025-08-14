// .eleventy.js
const { execSync } = require("child_process");
const { DateTime } = require("luxon");
require("dotenv").config();

module.exports = function (eleventyConfig) {
  const onCI = process.env.GITHUB_ACTIONS === "true";
  const owner = process.env.GITHUB_REPOSITORY_OWNER || "";
  const repo = (process.env.GITHUB_REPOSITORY || "").split("/")[1] || "";
  const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

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
    pathPrefix: onCI && !isUserSite ? `/${repo}/` : "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
