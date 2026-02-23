import { useEffect, useState } from 'react';

/**
 * 로컬스토리지와 동기화되는 상태 훅
 * @param key 로컬스토리지 키
 * @param initialValue 초기값
 * @returns [값, 설정 함수]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`로컬스토리지 읽기 오류 (키: ${key}):`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`로컬스토리지 쓰기 오류 (키: ${key}):`, error);
    }
  };

  return [storedValue, setValue];
}
