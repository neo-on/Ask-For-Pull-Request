document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const emailList = document.getElementById('emailList');

    // Load saved emails from storage
    chrome.storage.sync.get(['emails'], function(result) {
        const emails = result.emails || [];
        emails.forEach(email => addEmailToList(email));
    });

    // Add email to list and save to storage
    addButton.addEventListener('click', function() {
        const email = prompt("Enter email:");
        if (email) {
            addEmailToList(email);
            saveEmail(email);
        }
    });

    function addEmailToList(email) {
        const li = document.createElement('li');
        li.textContent = email;

        const deleteButton = document.createElement('img');
        deleteButton.src = 'rubbish-bin.svg';
        deleteButton.alt = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteEmail(email);
            li.remove();
        });

        li.appendChild(deleteButton);
        emailList.appendChild(li);

    }

    function deleteEmail(email) {
        chrome.storage.sync.get(['emails'], function(result) {
            const emails = result.emails || [];
            emails.pop(email);
            chrome.storage.sync.set({emails: emails});
        })
    }

    function saveEmail(email) {
        chrome.storage.sync.get(['emails'], function(result) {
            const emails = result.emails || [];
            emails.push(email);
            chrome.storage.sync.set({emails: emails});
        });
    }

});
