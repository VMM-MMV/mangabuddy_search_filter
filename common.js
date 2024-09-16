(function(window) {
  // Function to filter mangas based on chapter limits
  function filterMangas(minChapters, maxChapters) {
    const mangaItems = document.querySelectorAll('.book-item');
    mangaItems.forEach(item => {
      const latestChapter = item.querySelector('.latest-chapter');
      if (latestChapter) {
        const chapterNumber = parseFloat(latestChapter.textContent.replace(/[^\d.]/g, ''));
        if (chapterNumber < minChapters || chapterNumber > maxChapters) {
          item.style.display = 'none';
        }
      }
    });
  }

  // Function to get chapter limits from storage
  function getChapterLimits(callback) {
    chrome.storage.sync.get(['minChapterLimit', 'maxChapterLimit'], (data) => {
      const minChapterLimit = data.minChapterLimit || 20;
      const maxChapterLimit = data.maxChapterLimit || 200;
      callback(minChapterLimit, maxChapterLimit);
    });
  }

  // Expose functions to global scope
  window.MangaChapterFilter = {
    filterMangas: filterMangas,
    getChapterLimits: getChapterLimits,
  };

})(window);