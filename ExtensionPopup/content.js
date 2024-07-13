console.log("Welcome to Youtube");
console.log("Sending Notification msg");
let siteName;

if (window.location.host.includes('github.com')) {
    siteName = 'GitHub';
}
else if (window.location.host.includes('dev.azure.com')) {
    siteName = 'Azure DevOps';
}
else if (window.location.host.includes('aws.amazon.com')) {
    siteName = 'AWS';
}
chrome.runtime.sendMessage({type: 'SHOW_NOTIFICATION', site: siteName});
console.log("messege sent notification");