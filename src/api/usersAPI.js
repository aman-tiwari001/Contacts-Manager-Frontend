const access_token = localStorage.getItem('access_token');

const registerUser = async (credentials) => {
    try {
        const res = await fetch('https://contacts-manager-backedn.onrender.com/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            })
        })
        return res.json();
    }
    catch(err) {
        console.log("Unable to register", err);
    }
}

const loginUser = async (credentials) => {
    try {
        const res = await fetch('https://contacts-manager-backedn.onrender.com/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
        return res.json();
    }
    catch(err) {
        console.log("Unable to login", err);
    }
}

const currentUser = async (access_token) => {
    try {
        const res = await fetch('https://contacts-manager-backedn.onrender.com/api/users/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            }
        })
        return res.json();
    }
    catch(err) {
        console.log("Unable to fetch current user details", err);
    }
}

export {registerUser, loginUser, currentUser};