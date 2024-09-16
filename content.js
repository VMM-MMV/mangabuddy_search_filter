// Initialize the extension when the content script runs
MangaChapterFilter.getChapterLimits((minChapterLimit, maxChapterLimit) => {
  MangaChapterFilter.filterMangas(minChapterLimit, maxChapterLimit);
});