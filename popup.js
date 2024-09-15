// When the popup loads, retrieve and display the saved chapter limits
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['minChapterLimit', 'maxChapterLimit'], (data) => {
      const savedMinLimit = data.minChapterLimit || 20; // Default to 20 if not set
      const savedMaxLimit = data.maxChapterLimit || 100; // Default to 100 if not set
      document.getElementById('min-chapter-limit').value = savedMinLimit;
      document.getElementById('max-chapter-limit').value = savedMaxLimit;
    });
  });
  
  // Update the chapter limits when the user clicks the "Update Limit" button
  document.getElementById('update-limit').addEventListener('click', () => {
    const minChapterLimit = parseInt(document.getElementById('min-chapter-limit').value, 10);
    const maxChapterLimit = parseInt(document.getElementById('max-chapter-limit').value, 10);
  
    if (!isNaN(minChapterLimit) && !isNaN(maxChapterLimit)) {
      // Save the new limits to Chrome storage
      chrome.storage.sync.set({ minChapterLimit: minChapterLimit, maxChapterLimit: maxChapterLimit }, () => {
        console.log('Chapter limits updated: Min = ' + minChapterLimit + ', Max = ' + maxChapterLimit);
      });
  
      // Send message to content script to apply the new limits
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: updateMangaFilter,
          args: [minChapterLimit, maxChapterLimit]
        });
      });
    }
  });
  
  // Function to update manga filtering in the content script
  function updateMangaFilter(minLimit, maxLimit) {
    const mangaItems = document.querySelectorAll('.book-item');
    mangaItems.forEach(item => {
      const latestChapter = item.querySelector('.latest-chapter');
      if (latestChapter) {
        const chapterNumber = parseFloat(latestChapter.textContent.replace(/[^\d.]/g, ''));
        if (chapterNumber < minLimit || chapterNumber > maxLimit) {
          item.style.display = 'none';
        } else {
          item.style.display = '';
        }
      }
    });
  }
  