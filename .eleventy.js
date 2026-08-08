module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("notes", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/notes/*.{html,md}")
      .sort((a, b) => b.date - a.date);
  });

  // Pulls every unique tag across all notes, sorted alphabetically.
  // Powers the sidebar's category list — add a new tag to any note's
  // front matter and it appears here automatically, no manual edits.
  eleventyConfig.addFilter("uniqueTags", (notes) => {
    const tagSet = new Set();
    notes.forEach((note) => {
      (note.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return [...tagSet].sort();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
