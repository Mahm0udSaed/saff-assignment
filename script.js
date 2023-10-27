var currentPage = 0;
var rowsPerPage = 6;
var contactsData = [];


   const table = document.querySelector('table');

   const rows = table.getElementsByTagName('tr');
function createContact() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
 if (name === '' || email === '' || phone === '') {
        alert('Please fill in all fields');
        return; // Stop form submission
    }
    var data = {
        name: name,
        email: email,
        phone: phone
    };

    fetch('api/create_contact.php', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
           // alert(result.message);
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            contactsData.push(data);
            console.log("size "+contactsData.length)
            updateTable();
        } else {
            alert(result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchContacts() {
    fetch('api/get_contacts.php')
    .then(response => response.json())
    .then(data => {
    if(data.length===0){
        displayNoContactsAvailable()
    }
        data.forEach(contact=>{
         contactsData = data;
         updateTable();
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function updateTable() {
    var table = document.getElementById('contacts');
    table.innerHTML = ''; // Clear the table content
    var row = document.createElement('tr');

        var nameCell = document.createElement('th');
        nameCell.textContent = 'Name';
        row.appendChild(nameCell);

        var emailCell = document.createElement('th');
        emailCell.textContent = 'Email';
        row.appendChild(emailCell);

        var phoneCell = document.createElement('th');
        phoneCell.textContent = 'Phone';
        row.appendChild(phoneCell);

        table.appendChild(row);
    var startIndex = currentPage * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;

    for (var i = startIndex; i < endIndex && i < contactsData.length; i++) {
        var contact = contactsData[i];

        var row = document.createElement('tr');

        var nameCell = document.createElement('td');
        nameCell.textContent = contact.name;
        row.appendChild(nameCell);

        var emailCell = document.createElement('td');
        emailCell.textContent = contact.email;
        row.appendChild(emailCell);

        var phoneCell = document.createElement('td');
        phoneCell.textContent = contact.phone;
        row.appendChild(phoneCell);

        table.appendChild(row);
    }

    var pagination = document.getElementById('pagination');
    var previousButton = pagination.querySelector('#previous');
    var nextButton = pagination.querySelector('#next');

    if (currentPage === 0) {
        previousButton.disabled = true;
    } else {
        previousButton.disabled = false;
    }

    if (endIndex >= contactsData.length) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        updateTable();
    }
}

function nextPage() {
    var totalPage = Math.ceil(contactsData.length / rowsPerPage);
    if (currentPage < totalPage - 1) {
        currentPage++;
        updateTable();
    }
}

function displayNoContactsAvailable() {
    var table = document.getElementById('contacts'); // Assuming the table has an id of 'contacts'

    var row = document.createElement('tr');

    var nameCell = document.createElement('td');
    nameCell.textContent = 'No data available';
    nameCell.setAttribute('colspan', '3');
    row.appendChild(nameCell);


    table.appendChild(row);
}

// Fetch contacts on page load
fetchContacts();
