// Function to save chapter limits to storage
function saveChapterLimits(minChapterLimit, maxChapterLimit) {
  chrome.storage.sync.set({ minChapterLimit, maxChapterLimit }, () => {
    console.log('Chapter limits updated: Min = ' + minChapterLimit + ', Max = ' + maxChapterLimit);
  });
}

// When the popup loads, retrieve and display the saved chapter limits
document.addEventListener('DOMContentLoaded', () => {
  MangaChapterFilter.getChapterLimits((minChapterLimit, maxChapterLimit) => {
    document.getElementById('min-chapter-limit').value = minChapterLimit;
    document.getElementById('max-chapter-limit').value = maxChapterLimit;
  });
});

// Update the chapter limits when the user clicks the "Update Limit" button
document.getElementById('update-limit').addEventListener('click', () => {
  const minChapterLimit = parseInt(document.getElementById('min-chapter-limit').value, 10);
  const maxChapterLimit = parseInt(document.getElementById('max-chapter-limit').value, 10);

  if (!isNaN(minChapterLimit) && !isNaN(maxChapterLimit)) {
    saveChapterLimits(minChapterLimit, maxChapterLimit, () => {
      // After saving, apply the new limits to the current tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: MangaChapterFilter.filterMangas,
          args: [minChapterLimit, maxChapterLimit]
        });
      });
    });
  }
});