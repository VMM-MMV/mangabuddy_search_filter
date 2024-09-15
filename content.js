// Listen for changes to the limits stored in chrome.storage
chrome.storage.sync.get(['minChapterLimit', 'maxChapterLimit'], (data) => {
  let minChapterLimit = data.minChapterLimit || 20;
  let maxChapterLimit = data.maxChapterLimit || 100;

  filterMangas(minChapterLimit, maxChapterLimit);

  // Create a MutationObserver to apply the filter when the DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        filterMangas(minChapterLimit, maxChapterLimit);
      }
    });
  });

  // Start observing the document for changes
  observer.observe(document.body, { childList: true, subtree: true });
});

function filterMangas(minChapters, maxChapters) {
  const mangaItems = document.querySelectorAll('.book-item');
  mangaItems.forEach(item => {
    const latestChapter = item.querySelector('.latest-chapter');
    if (latestChapter) {
      const chapterNumber = parseFloat(latestChapter.textContent.replace(/[^\d.]/g, ''));
      if (chapterNumber < minChapters || chapterNumber > maxChapters) {
        item.style.display = 'none';
      } else {
        item.style.display = ''; // Show the item if it meets the chapter limits
      }
    }
  });
}
