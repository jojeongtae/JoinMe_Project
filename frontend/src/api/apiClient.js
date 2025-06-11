import axios from "axios";
import store, { setToken } from "../mainSlice";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        if (config.data && config.data instanceof URLSearchParams) {
            config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        const jwtToken = store.getState().main.token;
        if (jwtToken) {
            config.headers["Authorization"] = `Bearer ${jwtToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post("http://localhost:8080/reissue", null, {
                    withCredentials: true
                });

                const newAccessToken = res.headers["authorization"];
                if (newAccessToken) {
                    const tokenOnly = newAccessToken.startsWith("Bearer ")
                        ? newAccessToken.slice(7)
                        : newAccessToken;

                    store.dispatch(setToken(tokenOnly));

                    originalRequest.headers["Authorization"] = `Bearer ${tokenOnly}`;
                    return apiClient(originalRequest);
                } else {
                    console.log("토큰 재발급 실패: 응답에 토큰 없음");
                }
            } catch (reissueError) {
                console.error("토큰 재발급 중 오류 발생", reissueError);
                return Promise.reject(reissueError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;