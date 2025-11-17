import { RequestSigninDto, RequestSignupDto, ResponseSigninDto, ResponseSignupDto, ResponseMyInfoDto } from "../types/auth";
import {axiosInstance} from "./axios";

export  const postSignup = async(body: RequestSignupDto):Promise<ResponseSignupDto> => {
    const { data:responseData } = await axiosInstance.post(
        "/v1/auth/signup", 
        body
    )
    return responseData;
}

export  const postSignin = async(body: RequestSigninDto):Promise<ResponseSigninDto> => {
    const { data:responseData } = await axiosInstance.post(
        "/v1/auth/signin", 
        body
    )
    return responseData;
}

export const getMyInfo = async():Promise<ResponseMyInfoDto> => {
    const { data:responseData } = await axiosInstance.get(
        "/v1/users/me"
    )
    return responseData;
}

export const postLogout = async() => {
    const{data} = await axiosInstance.post('/v1/auth/signout');
    return data;
}