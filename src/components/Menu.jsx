import { useState, useContext } from "react";
import { MenuContext } from "../context/menuContext";
import { CartContext } from "../context/cartContext";
import Item from "./Item";
import OrderModal from "./OrderModal";

function Menu() {
  // useContext로 menu 데이터 가져오기 (props 대신)
  const { menu } = useContext(MenuContext);

  // useContext로 cart, setCart 가져오기 (props 대신)
  const { cart, setCart } = useContext(CartContext);

  const [modalOn, setModalOn] = useState(false);
  const [modalMenu, setModalMenu] = useState(null);

  if (!menu)
    return (
      <div style={{ textAlign: "center", margin: "80px" }}>
        메뉴 정보가 없어요!
      </div>
    );

  const categorys = Object.keys(menu);

  return (
    <>
      {categorys.map((category) => {
        return (
          <section key={category}>
            <h2>{category}</h2>
            <ul className="menu">
              {menu[category].map((item) => (
                <Item
                  key={item.name}
                  item={item}
                  clickHandler={() => {
                    setModalMenu(item);
                    setModalOn(true);
                  }}
                />
              ))}
            </ul>
          </section>
        );
      })}
      {modalOn ? (
        <OrderModal
          modalMenu={modalMenu}
          setModalOn={setModalOn}
          cart={cart}
          setCart={setCart}
        />
      ) : null}
    </>
  );
}

export default Menu;
