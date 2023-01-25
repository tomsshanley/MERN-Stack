// this file is for making http requests, sending data back
// and storing in local stroage
// axios can be used just like postman but whithin your application

import axios from 'axios'


const API_URL = '/api/users/'

// Register User
const register = async (userData) => {
    // making a post request
    const response = await axios.post(API_URL, userData)

    // if it works then store to local storage
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// create a variable to store functions to be exported
const authService = {
    register
}

export default authService