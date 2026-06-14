import axios from 'axios';
const isLocal = true
const instance = axios.create(
    {
        baseURL: isLocal ? "http://localhost:8081/" : "https://smart-busy-chess.glitch.me/",
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        }
    })

export const api = {
    async me() {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.get('/me', {headers: {token}})
            console.log(data);
            return data
        } catch (e) {
            console.error(e)
        }
    },

    async getUsers() {
        try {
            const { data } = await instance.get('/users')
            return data
        } catch (e) {
            console.error(e)
        }
    },

    async login(code) {    
        try {
            const { data } = await instance.post('/login', { code })
            localStorage.setItem('token', data.token)
            return data.token
        } catch (e) {
            console.error(e)
            throw e
        }
    },

    async addUser(name) {
        try {
            const { data } = await instance.post('/user', { name })
            return data.user
        } catch (e) {
            console.error(e)
            throw e
        }
    },

    async sendChips(recieverId, sum) {
        try {
            const token = localStorage.getItem('token')
            const { data } = await instance.put('/send-chips', { recieverId, sum }, {headers: {token}})
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}