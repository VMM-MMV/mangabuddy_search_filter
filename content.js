function filterMangas() {
    const mangaItems = document.querySelectorAll('.book-item');
    mangaItems.forEach(item => {
      const latestChapter = item.querySelector('.latest-chapter');
      if (latestChapter) {
        const chapterNumber = parseInt(latestChapter.textContent.replace(/\D/g,''), 10);
        if (chapterNumber < 20) {
          item.style.display = 'none';
        }
      }
    });
  }
  
  filterMangas();
  
  // Create a MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        filterMangas();
      }
    });
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });