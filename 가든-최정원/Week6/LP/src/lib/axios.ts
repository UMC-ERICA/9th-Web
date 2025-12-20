// src/lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// 토큰 자동 첨부 + refresh 로직은 필요하면 여기 추가 가능
export default instance;
