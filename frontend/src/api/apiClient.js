import axios from "axios";
import store, {setToken} from "../mainSlice";

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

        // 토큰이 있다면 Authorization 헤더에 추가
        const jwtToken = store.getState().token?.token; // 정확한 위치 확인
        if (jwtToken) {
            config.headers["authorization"] = jwtToken;
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

        if (error.response?.status === 456 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post("http://localhost:8080/reissue", null, {
                    withCredentials: true
                });

                const newAccessToken = res.headers["authorization"];
                if (newAccessToken) {
                    // 토큰 Redux에 저장
                    store.dispatch(setToken(newAccessToken));

                    // Authorization 헤더 갱신 후 재요청
                    originalRequest.headers["authorization"] = newAccessToken;
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