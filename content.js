// Listen for changes to the limit stored in chrome.storage
chrome.storage.sync.get('minChapterLimit', (data) => {
  let minChapterLimit = data.minChapterLimit || 20;

  filterMangas(minChapterLimit);

  // Create a MutationObserver to apply the filter when the DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        filterMangas(minChapterLimit);
      }
    });
  });

  // Start observing the document for changes
  observer.observe(document.body, { childList: true, subtree: true });
});

function filterMangas(minChapters) {
  const mangaItems = document.querySelectorAll('.book-item');
  mangaItems.forEach(item => {
    const latestChapter = item.querySelector('.latest-chapter');
    if (latestChapter) {
      const chapterNumber = parseFloat(latestChapter.textContent.replace(/[^\d.]/g, ''));
      if (chapterNumber < minChapters) {
        item.style.display = 'none';
      } else {
        item.style.display = ''; // Show the item if it meets the chapter limit
      }
    }
  });
}
