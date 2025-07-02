// This content script runs in the context of the web page
// It can interact with the page's DOM and send data to the background script

// Listen for XHR requests to capture grade data
(function() {
  // Store the original XMLHttpRequest open method
  const originalOpen = XMLHttpRequest.prototype.open;
  
  // Override the open method
  XMLHttpRequest.prototype.open = function(method, url) {
    // Check if this is a grade request on yjs.sjtu.edu.cn
    if (url.includes('xscjcx.do') && (url.includes('yjs.sjtu.edu.cn') || url.startsWith('/'))) {
      // Add a load event listener to capture the response
      this.addEventListener('load', function() {
        try {
          // Try to parse the response as JSON
          const responseData = JSON.parse(this.responseText);
          
          // Send the data to the background script
          chrome.runtime.sendMessage({
            action: 'capturedGradeData',
            data: responseData
          });
          
          console.log('Grade data captured and sent to background script');
        } catch (error) {
          console.error('Error parsing grade data:', error);
        }
      });
    }
    
    // Call the original open method
    return originalOpen.apply(this, arguments);
  };
  
  console.log('SJTU Grade Viewer content script loaded');
})();

// Add a small notification to indicate the extension is active
function addExtensionIndicator() {
  // Create indicator element
  const indicator = document.createElement('div');
  indicator.style.position = 'fixed';
  indicator.style.bottom = '20px';
  indicator.style.right = '20px';
  indicator.style.backgroundColor = '#003f88';
  indicator.style.color = 'white';
  indicator.style.padding = '8px 12px';
  indicator.style.borderRadius = '8px';
  indicator.style.fontSize = '13px';
  indicator.style.zIndex = '9999';
  indicator.style.opacity = '0.9';
  indicator.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  indicator.style.transition = 'all 0.2s ease';
  indicator.style.cursor = 'pointer';
  indicator.style.display = 'flex';
  indicator.style.alignItems = 'center';
  indicator.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  
  // Create icon
  const icon = document.createElement('span');
  icon.textContent = '📊';
  icon.style.marginRight = '6px';
  icon.style.fontSize = '16px';
  
  // Create text
  const text = document.createElement('span');
  text.textContent = 'Grade Viewer Active';
  
  // Add elements to indicator
  indicator.appendChild(icon);
  indicator.appendChild(text);
  
  // Add hover effect
  indicator.addEventListener('mouseenter', () => {
    indicator.style.opacity = '1';
    indicator.style.transform = 'translateY(-3px)';
    indicator.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
  });
  
  indicator.addEventListener('mouseleave', () => {
    indicator.style.opacity = '0.9';
    indicator.style.transform = 'translateY(0)';
    indicator.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  });
  
  // Add click handler to open popup
  indicator.addEventListener('click', () => {
    // Add click effect
    indicator.style.transform = 'scale(0.95)';
    setTimeout(() => {
      indicator.style.transform = 'scale(1)';
      chrome.runtime.sendMessage({ action: 'openPopup' });
    }, 100);
  });
  
  // Add to page
  document.body.appendChild(indicator);
}

// Wait for page to load before adding indicator
window.addEventListener('load', () => {
  // Only add indicator on yjs.sjtu.edu.cn pages
  if (window.location.hostname === 'yjs.sjtu.edu.cn') {
    setTimeout(addExtensionIndicator, 1000);
  }
}); 