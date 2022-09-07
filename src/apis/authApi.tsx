import axios from "axios";

const baseUrl = "http://localhost:4000/api";

const authApi = axios.create({baseURL: baseUrl});

authApi.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config!.headers!['x-auth-token'] = token;
    }
    return config;
});

export default authApi;