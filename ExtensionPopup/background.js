chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("msg received: " + JSON.stringify(message));

    if (message.type === 'SHOW_NOTIFICATION') {
        chrome.storage.sync.get(['emails'], (result) => {
            let emailList = result.emails ? result.emails.join(' ,\n') : 'No emails stored';
            notificationMessage = `Hello from ${message.site}\n\nEmails: ${emailList}`;

            // Truncate the message if it exceeds the notification character limit
            const maxLength = 200;  // Adjust as necessary
            if (notificationMessage.length > maxLength) {
                notificationMessage = notificationMessage.substring(0, maxLength - 3) + '...';
            }
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'expansion.png',
                title: message.site +' Notification',
                message: notificationMessage
            });
        });
        console.log("Notification done");
    }
});