import {useState} from "react";
import apiClient from "../api/apiClient";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [filePath, setFilePath] = useState(null);

    const handleFileChange = e => {
        setFile(e.target.files[0]); // 선택한파일 state에 저장
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) { return alert("파일을 선택해 주세요"); }

        const formData = new FormData(); // 멀티미디어 데이터를 요청의 body에 넣을때 사용되는 틀
        formData.append("image", file);

        try {
            const response = await apiClient.post("/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFilePath(response.data.filePathName);
            console.log(response.data.filePathName);
        } catch (e) {
            console.error(e);
            alert("업로드 실패");
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">업로드</button>
                {filePath && <img src={filePath} alt="image"/>}
            </form>
        </>
    );
}