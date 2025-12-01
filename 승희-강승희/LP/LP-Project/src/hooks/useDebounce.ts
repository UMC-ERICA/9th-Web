import { useEffect, useState } from "react";
import { set } from "zod/v4-mini";

function useDebounce<T>(value:T, delay:number) {
    const[debouncedValue, setDebouncedValue] = useState<T>(value)

    // value, delay가 변경될때마다 실행
    useEffect(() => {
        //delay(ms) 후에 실행
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        
        // value가 변경되면, 기존 타이머를 지워서 업데이트를 취소
        // 값이 계속 바뀔 때마다 마지막 멈춘 값만 업데이트 된다
        return () => clearTimeout(handler);
    }, [value, delay]);

    // 최종적으로 잠시 기다린 후의 값을 반환함
    return debouncedValue;
}

export default useDebounce;