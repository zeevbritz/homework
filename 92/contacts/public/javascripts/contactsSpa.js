/*global $*/
(function () {
    'use strict';

    let contacts = [];
    let addContactForm = $('#addContactForm');
    let theTableBody = $('#contactsTable tbody');
    let search = $('#search');

    let lastname = $('#lastname');
    let email = $('#email');
    let id = $('#id');

    search.submit(event => {
        let query = '?';
        let searchContact = {
            lastname: lastname.val(),
            email: email.val(),
            id: id.val()
        };
        const existingQuery = ['lastname', 'email', 'id'].filter(field => searchContact[field]);
        if (existingQuery.length) {
            theTableBody.empty();

            query += existingQuery.map(field => `${field}=${searchContact[field]}`).join('&');

            $.get(`/api/contacts${query}`, loadedContacts => {
                loadedContacts.forEach(contact => displyContact(contact));
            }).fail((xhr) => {
                alert(xhr.responseText);
            });
        }
        event.preventDefault();
    });

    $('#addContact').click(function () {
        addContactForm.slideDown(3000);
    });

    theTableBody.on('click', 'button.delete', event => {
        const rowToDelete = $(event.target).closest('tr');
        $.ajax({
            method: 'DELETE',
            url: `/api/contacts/${rowToDelete.data('contactId')}`,
            success: () => {
                rowToDelete.remove();
            }
        }).fail(() => {
            alert('failed to delete');
        });
    });

    function addContact(newContact) {
        if (!contacts.length) {
            theTableBody.empty();
        }

        contacts.push(newContact);
        displyContact(newContact);
    }

    function displyContact(contact) {
        const newRow = $(`<tr>
                            <td>${contact.firstname}</td>
                            <td>${contact.lastname}</td>
                            <td>${contact.email}</td>
                            <td>${contact.phone}</td>
                            <td>
                                <button class="update">update</button>
                                <button class="delete">delete</button>
                            </td>
                        </tr>`)
            .appendTo(theTableBody)
            .data('contactId', contact.id);
    }



    /*newRow.find('button')
        .click(() => {
            console.log('Would delete', newContact);
            newRow.remove();
        });*/
    // }

    let firstNameElem = $('#first');
    let lastNameElem = $('#last');
    let emailElem = $('#email');
    let phoneElem = $('#phone');

    addContactForm.submit(function (event) {
        let newContact = {
            firstname: firstNameElem.val(),
            lastname: lastNameElem.val(),
            email: emailElem.val(),
            phone: phoneElem.val()
        };

        $.post('/api/contacts', newContact, res => {
            addContact(res);
        }, 'json').fail(() => {
            alert('failed to add contact');
        });


        hideAddContactForm();

        event.preventDefault();
    });

    $('#cancel').click(function () {
        hideAddContactForm();
    });

    function hideAddContactForm() {
        addContactForm.slideUp('slow');
        /*firstNameElem.val('');
        lastNameElem.val('');
        emailElem.val('');
        phoneElem.val('');*/
        addContactForm[0].reset();
    }

    $('#load').click(() => {
        theTableBody.empty();
        $.get('/api/contacts', loadedContacts => {
            loadedContacts.forEach(contact => addContact(contact));
        });
    });
}());


