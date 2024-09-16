// Function to set up DOM observation and filtering
function setupDOMObserver(minChapters, maxChapters) {
  MangaChapterFilter.filterMangas(minChapters, maxChapters);
  
  // Create a MutationObserver to apply the filter when the DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        MangaChapterFilter.filterMangas(minChapters, maxChapters);
      }
    });
  });
  
  // Start observing the document for changes
  observer.observe(document.body, { childList: true, subtree: true });

  return observer;
}

// Initialize the extension when the content script runs
MangaChapterFilter.getChapterLimits((minChapterLimit, maxChapterLimit) => {
  setupDOMObserver(minChapterLimit, maxChapterLimit);
});