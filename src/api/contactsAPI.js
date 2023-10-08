const access_token = localStorage.getItem('access_token');

const getAllContacts = async (access_token) => {

    try {
        const allContacts = await fetch('https://contacts-manager-backedn.onrender.com/api/contacts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": access_token
            }
        });
    
        return allContacts.json();
    }
    catch(err) {
        console.log("Unable to fetch all contacts", err);
    }
}

const getContactById = async (id) => {

    try {
        const contact = await fetch(`https://contacts-manager-backedn.onrender.com/api/contacts/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": access_token
            }
        });
    
        return contact.json();
    }
    catch(err) {
        console.log("Unable to fetch the contact", err);
    }
}

const createContact = async (details) => {

    try {
        const newContact = await fetch(`https://contacts-manager-backedn.onrender.com/api/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": access_token
            },
            body: JSON.stringify({
                name: details.name,
                email: details.email,
                phone: details.phone
            })
        });
    
        return newContact.json();
    }
    catch(err) {
        console.log("Unable to create new contact", err);
    }
}

const updateContact = async (details, id) => {

    try {
        const updatedContact = await fetch(`https://contacts-manager-backedn.onrender.com/api/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": access_token
            },
            body: JSON.stringify({
                name: details.name,
                email: details.email,
                phone: details.phone
            })
        });
    
        return updatedContact.json();
    }
    catch(err) {
        console.log("Unable to update the contact", err);
    }
}
const deleteContact = async (id) => {

    try {
        const delContact = await fetch(`https://contacts-manager-backedn.onrender.com/api/contacts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": access_token
            }
        });
    
        return delContact;
    }
    catch(err) {
        console.log("Unable to delete the contact", err);
    }
}

const getContactsByQuery = async (access_token, query) => {

    try {
        const saecrhRes = await fetch(`https://contacts-manager-backedn.onrender.com/api/contacts/search/${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": access_token
            }
        });

        return saecrhRes.json();
    }
    catch (err) {
        console.log("Unable to fetch search results", err);
    }
}

export {getAllContacts, getContactById, createContact, updateContact, deleteContact, getContactsByQuery};
