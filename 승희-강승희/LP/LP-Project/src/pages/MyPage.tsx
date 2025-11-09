import {useEffect, useState} from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto>([]);

    useEffect(() => {
        const getData = async() => {
            const response = await getMyInfo();
            console.log(response);
            console.log("아바타 URL:", response.data?.avatar); // 아바타 URL만 확인

            setData(response);
        }
        getData();
    }, []); 

    const handleLogout = async() => {
        await logout();
        navigate('/');
    }

    return (
         <div>
            <h1>내 정보</h1>
            <p>이메일: {data.data?.email}</p>
            <p>이름: {data.data?.name}</p>
            <button onClick={handleLogout} className="cursor-pointer bg-red-500 text-white p-2 rounded hover:bg-red-600 hover:scale-90 transition-transform">
                로그아웃
            </button>
        </div>
    )
}
export default MyPage;