// When the popup loads, retrieve and display the saved chapter limits.
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
    saveChapterLimits(minChapterLimit, maxChapterLimit, 
                      () => applyChapterLimitsToTab(minChapterLimit, maxChapterLimit));
  }
});

// Function to save chapter limits to storage
function saveChapterLimits(minChapterLimit, maxChapterLimit, callback) {
  chrome.storage.sync.set({ minChapterLimit, maxChapterLimit }, () => { if (callback) callback() });
}

// Function to apply chapter limits to the current tab
function applyChapterLimitsToTab(minChapterLimit, maxChapterLimit) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: MangaChapterFilter.filterMangas,
      args: [minChapterLimit, maxChapterLimit]
    });
  });
}