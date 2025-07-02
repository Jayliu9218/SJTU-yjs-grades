// Store the captured grade data
let gradeData = null;

// Function to process captured data
function processGradeData(data) {
  if (!data) return;
  
  console.log("Processing captured grade data");
  gradeData = data;
  
  // Store in chrome storage for persistence
  chrome.storage.local.set({ 'gradeData': data });
  
  // Create notification badge on extension icon
  chrome.action.setBadgeText({ text: "!" });
  chrome.action.setBadgeBackgroundColor({ color: "#4CAF50" });
  
  // Clear badge after 5 seconds
  setTimeout(() => {
    chrome.action.setBadgeText({ text: "" });
  }, 5000);
}

// Listen for network requests
chrome.webRequest.onCompleted.addListener(
  function(details) {
    // Check if this is the grades request we're looking for
    if (details.url.includes("xscjcx.do") && details.method === "POST") {
      console.log("Detected grades request:", details.url);
      
      // Make a new request to get the response data
      fetch(details.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        // We would normally need to include the same body as the original request
        // This is a simplified version - in real use, you might need to capture the request body too
        body: "queryModel.showCount=999&queryModel.currentPage=1&queryModel.sortName=&queryModel.sortOrder=asc"
      })
      .then(response => response.json())
      .then(data => {
        console.log("Captured grade data");
        processGradeData(data);
      })
      .catch(error => {
        console.error("Error fetching grade data:", error);
      });
    }
  },
  { urls: ["*://*.sjtu.edu.cn/*/xscjcx.do*"] }
);

// Listen for messages from the popup and content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getGradeData") {
    // First try to get from memory
    if (gradeData) {
      sendResponse({ data: gradeData });
      return true;
    }
    
    // If not in memory, try to get from storage
    chrome.storage.local.get(['gradeData'], function(result) {
      if (result.gradeData) {
        gradeData = result.gradeData;
        sendResponse({ data: result.gradeData });
      } else {
        sendResponse({ data: null });
      }
    });
    return true; // Required for async sendResponse
  } 
  else if (message.action === "capturedGradeData") {
    // Data captured by content script
    console.log("Received grade data from content script");
    gradeData = message.data;
    chrome.storage.local.set({ 'gradeData': message.data });
    return true;
  }
  else if (message.action === "openPopup") {
    // Create a new tab with the popup content
    // This is a workaround since we can't programmatically open the popup
    chrome.tabs.create({ url: "popup.html" });
    return true;
  }
  else if (message.action === "clearCache") {
    // Clear memory cache
    console.log("Clearing grade data cache");
    gradeData = null;
    return true;
  }
}); 