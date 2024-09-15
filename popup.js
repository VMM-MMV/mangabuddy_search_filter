// When the popup loads, retrieve and display the saved chapter limit
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('minChapterLimit', (data) => {
      const savedLimit = data.minChapterLimit || 20; // Default to 20 if not set
      document.getElementById('chapter-limit').value = savedLimit;
    });
  });
  
  // Update the chapter limit when the user clicks the "Update Limit" button
  document.getElementById('update-limit').addEventListener('click', () => {
    const chapterLimit = parseInt(document.getElementById('chapter-limit').value, 10);
  
    if (!isNaN(chapterLimit)) {
      // Save the new limit to Chrome storage
      chrome.storage.sync.set({ minChapterLimit: chapterLimit }, () => {
        console.log('Minimum chapter limit set to ' + chapterLimit);
      });
  
      // Send message to content script to apply the new limit
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: updateMangaFilter,
          args: [chapterLimit]
        });
      });
    }
  });
  
  // Function to update manga filtering in the content script
  function updateMangaFilter(limit) {
    const mangaItems = document.querySelectorAll('.book-item');
    mangaItems.forEach(item => {
      const latestChapter = item.querySelector('.latest-chapter');
      if (latestChapter) {
        const chapterNumber = parseFloat(latestChapter.textContent.replace(/[^\d.]/g, ''));
        if (chapterNumber < limit) {
          item.style.display = 'none';
        } else {
          item.style.display = '';
        }
      }
    });
  }
  