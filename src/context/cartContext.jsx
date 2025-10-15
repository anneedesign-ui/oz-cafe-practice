import { createContext, useState } from "react";

// Context 생성 - 장바구니 관련 데이터를 담을 Context(컨텍스트)
export const CartContext = createContext();

// Provider 컴포넌트 - 전역으로 상태를 제공하는 역할
export function CartProvider({ children }) {
  // cart state(스테이트) - 장바구니에 담긴 아이템들의 배열(array)
  const [cart, setCart] = useState([]);

  // addToCart 함수 - 장바구니에 상품 추가하기
  const addToCart = (menu) => {
    // 이미 장바구니에 같은 상품이 있는지 확인
    const existingItem = cart.find((item) => item.id === menu.id);

    if (existingItem) {
      // 이미 있다면 수량(quantity)만 1 증가
      setCart(
        cart.map((item) =>
          item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // 없다면 새로운 아이템으로 추가 (quantity는 1로 시작)
      setCart([...cart, { ...menu, quantity: 1 }]);
    }
  };

  // removeFromCart 함수 - 장바구니에서 상품 제거하기
  const removeFromCart = (id) => {
    // filter(필터) 메서드로 해당 id를 제외한 새로운 배열 생성
    setCart(cart.filter((item) => item.id !== id));
  };

  // value(밸류) 객체 - 하위 컴포넌트에 전달할 데이터와 함수들
  const value = {
    cart, // 장바구니 상태
    setCart, // 장바구니 상태 변경 함수
    addToCart, // 장바구니 추가 함수
    removeFromCart, // 장바구니 제거 함수
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
