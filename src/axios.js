import axios from "axios"

const instance = axios.create({
    baseURL: "https://react-pizza-m8ct.onrender.com"
})
// http://localhost:5000
// https://react-pizza-m8ct.onrender.com
instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem("token")
    return config
})
export default instance