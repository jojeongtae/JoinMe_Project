import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});
apiClient.interceptors.request.use(config => {
    if (config.data && config.data instanceof URLSearchParams) {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded"
    }
// const jwtToken = store.getState().token.token;   슬라이스 만든후 추가
// config.headers["authorization"] = jwtToken;
// return config;
}, (err) => {
    return Promise.reject(err);
});
apiClient.interceptors.response.use(response => response,
    async (err) => {
        if (err.response && err.response.status === 456 && !originalRequest._retry) {
            originalRequset._retry = true;
            try {
                const res = await axios.post("http://localhost:8080/reissue", null, {
                    withCredentials: true
                })
                const access = res.headers["authorization"];
                // store.dispatch(setToken(access));
                // return apiClient(originalRequset) 슬라이스 만든후 추가

            } catch (error) {
                console.log("토큰 재발급 실패",error);
                return Promise.reject(error);
            }
        }
        return Promise.reject(err);
    })
export default apiClient;