import {useEffect, useState} from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto>();

    useEffect(() => {
        const getData = async() => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        }
        getData();
    }, []); 
    return (
        <div>
            <h1>{data?.data.name}</h1>
            <p>{data?.data.email}</p>
        </div>
    )
}
export default MyPage;