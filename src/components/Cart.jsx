import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { MenuContext } from "../context/menuContext";
import data from "../assets/data";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const { menu } = useContext(MenuContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editOptions, setEditOptions] = useState({});
  const [editQuantity, setEditQuantity] = useState(1);

  const itemOptions = data.options;

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, idx) => idx !== index);
    setCart(newCart);
  };

  const startEditing = (index, item) => {
    setEditingIndex(index);
    setEditOptions(item.options);
    setEditQuantity(item.quantity);
  };

  const saveEdit = (index) => {
    const newCart = [...cart];
    newCart[index] = {
      ...newCart[index],
      options: editOptions,
      quantity: editQuantity,
    };
    setCart(newCart);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((cartItem) => {
      const categorys = Object.keys(menu);
      categorys.forEach((category) => {
        const item = menu[category].find(
          (menuItem) => menuItem.id === cartItem.id
        );
        if (item) {
          total += item.price * cartItem.quantity;
        }
      });
    });
    return total;
  };

  const getOptionLabel = (key, value) => {
    const labels = itemOptions[key];
    return labels ? labels[value] : value;
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>장바구니</h2>

      {cart.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#999",
            fontSize: "18px",
          }}
        >
          장바구니가 비어있습니다
        </p>
      ) : (
        <>
          <div>
            {cart.map((cartItem, index) => {
              let itemInfo = null;
              const categorys = Object.keys(menu);
              categorys.forEach((category) => {
                const found = menu[category].find(
                  (menuItem) => menuItem.id === cartItem.id
                );
                if (found) itemInfo = found;
              });

              if (!itemInfo) return null;

              const isEditing = editingIndex === index;

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "20px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    marginBottom: "16px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* 이미지 - 잘리지 않도록 contain 사용 */}
                  <img
                    src={itemInfo.img}
                    alt={itemInfo.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />

                  {/* 상품 정보 */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                      {itemInfo.name}
                    </h3>

                    {/* 옵션 표시 또는 수정 */}
                    {isEditing ? (
                      <div style={{ marginBottom: "12px" }}>
                        {Object.keys(itemOptions).map((optionName) => (
                          <div key={optionName} style={{ marginBottom: "8px" }}>
                            <label style={{ fontSize: "14px", color: "#666" }}>
                              {optionName}:{" "}
                              <select
                                value={editOptions[optionName] || 0}
                                onChange={(e) =>
                                  setEditOptions({
                                    ...editOptions,
                                    [optionName]: Number(e.target.value),
                                  })
                                }
                                style={{
                                  padding: "4px 8px",
                                  marginLeft: "8px",
                                  borderRadius: "4px",
                                  border: "1px solid #ddd",
                                  fontSize: "14px",
                                }}
                              >
                                {itemOptions[optionName].map((option, idx) => (
                                  <option key={idx} value={idx}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                        ))}

                        <div>
                          <label style={{ fontSize: "14px", color: "#666" }}>
                            개수:{" "}
                            <input
                              type="number"
                              value={editQuantity}
                              min="1"
                              onChange={(e) =>
                                setEditQuantity(Number(e.target.value))
                              }
                              style={{
                                width: "60px",
                                padding: "4px 8px",
                                marginLeft: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                fontSize: "14px",
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginBottom: "8px" }}>
                        <p
                          style={{
                            margin: "4px 0",
                            fontSize: "14px",
                            color: "#666",
                          }}
                        >
                          {Object.entries(cartItem.options).map(
                            ([key, value], idx) => (
                              <span key={key}>
                                {idx > 0 && " • "}
                                <strong>{key}:</strong>{" "}
                                {getOptionLabel(key, value)}
                              </span>
                            )
                          )}
                        </p>
                        <p
                          style={{
                            margin: "4px 0",
                            fontSize: "14px",
                            color: "#666",
                          }}
                        >
                          개수: {cartItem.quantity}개
                        </p>
                      </div>
                    )}

                    <p
                      style={{
                        margin: "8px 0 0 0",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {(itemInfo.price * cartItem.quantity).toLocaleString()}원
                    </p>
                  </div>

                  {/* 미니멀한 버튼 */}
                  <div
                    style={{ display: "flex", gap: "8px", marginLeft: "auto" }}
                  >
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(index)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "transparent",
                            color: "#2196F3",
                            border: "1px solid #2196F3",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "500",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#2196F3";
                            e.target.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#2196F3";
                          }}
                        >
                          ✓ 저장
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "transparent",
                            color: "#999",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "500",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#f5f5f5";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                          }}
                        >
                          ✕ 취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(index, cartItem)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "transparent",
                            color: "#666",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "500",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#f5f5f5";
                            e.target.style.borderColor = "#999";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.borderColor = "#ddd";
                          }}
                        >
                          ✎ 수정
                        </button>
                        <button
                          onClick={() => removeFromCart(index)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "transparent",
                            color: "#ff4444",
                            border: "1px solid #ffdddd",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "500",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#fff5f5";
                            e.target.style.borderColor = "#ff4444";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.borderColor = "#ffdddd";
                          }}
                        >
                          ✕ 삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "32px",
              padding: "24px",
              borderTop: "2px solid #333",
              textAlign: "right",
            }}
          >
            <h3 style={{ fontSize: "26px", margin: 0, fontWeight: "bold" }}>
              총 금액:{" "}
              <span style={{ color: "#2196F3" }}>
                {calculateTotal().toLocaleString()}원
              </span>
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
