const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJFbG9uIE11c2siLCJlbWFpbCI6Im11c2tAdGVzbGEuY29tIiwiaWQiOiI2NTIxMWIwMTI5MWRlMTFiMjNjNWQxY2IifSwiaWF0IjoxNjk2NzQ3MDI0LCJleHAiOjE2OTY3NTA2MjR9.D35y6b82M6hu7CckqLn11a-j_3i-ntSKiswJsyVym-Q';

const getAllContacts = async () => {

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
    catch (err) {
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
    catch (err) {
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
    catch (err) {
        console.log("Unable to create new contact", err);
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

const getData = async () => {
    console.log(await getContactsByQuery(access_token, 'dtu'));
}

getData();