import { createContext, useState } from "react";
import data from "../assets/data";

// Context 생성 - 메뉴 관련 데이터를 담을 Context(컨텍스트)
export const MenuContext = createContext();

// Provider 컴포넌트 - 메뉴 상태를 전역으로 제공
export function MenuProvider({ children }) {
  // data.menu에서 메뉴 정보 가져오기
  const [menu, setMenu] = useState(data.menu);

  // value(밸류) 객체 - 하위 컴포넌트에 전달할 데이터
  const value = {
    menu, // 메뉴 목록 상태
    setMenu, // 메뉴 목록 변경 함수
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
