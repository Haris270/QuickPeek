
chrome.commands.onCommand.addListener((command) => {
    if (command === "open-popup") {
      chrome.action.openPopup().catch((error) => {
        console.error("Failed to open popup:", error);
      });
    }
  });
  
