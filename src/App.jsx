import { CartProvider } from "./context/cartContext";
import { MenuProvider } from "./context/menuContext";
import "./App.scss";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";

function App() {
  // 더 이상 useState로 cart와 menu를 관리하지 않음!
  // Context Provider가 상태를 관리함
  // console.log도 제거 (이제 필요없음)

  return (
    // MenuProvider와 CartProvider로 전체 앱을 감싸기
    // React Router와 함께 사용할 때는 Routes 바깥에 Provider를 배치
    <MenuProvider>
      <CartProvider>
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </MenuProvider>
  );
}

export default App;
