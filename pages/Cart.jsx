import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import Background from "../components/Background";
import Container from "../components/Container";
import { Store } from "../utils/Store";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    document.title = "Carrito - E-commerce";
  });

  const removeCart = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCart = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <>
      <Background className="2xl:min-h-screen mb-36 md:mb-0">
        <Container>
          <div className="flex flex-col items-center my-5">
            <h1 className="mb-5">Carrito de compras</h1>
            {cartItems.length === 0 ? (
              <div className="mt-10 flex flex-col items-center max-w-xs">
                <p>El carrito esta vacio :(</p>
                <Link href="/">
                  <button className="mt-2 w-full rounded-2xl bg-white text-black p-3 hover:scale-105 duration-200 transition-all">
                    Tienda
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="gap-5 grid grid-cols-4">
                  {cartItems.map((item) => (
                    <div className="flex flex-col items-center" key={item.id}>
                      <Image
                        src={item.image}
                        alt="/"
                        height="230"
                        width="170"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-md"
                      />
                      <p className="my-1 text-xs">
                        Producto:{" "}
                        <span className="text-lg ml-1">{item.name}</span>
                      </p>
                      <p className="text-xs">
                        Precio:{" "}
                        <span className="text-lg ml-1">
                          ${item.price * item.quantity} ARS
                        </span>
                      </p>
                      <div className="flex mt-2 gap-2">
                        <p className="text-xs">Cantidad:</p>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateCart(item, e.target.value)}
                          className="text-black text-sm rounded-sm outline-none ml-1"
                        >
                          {[...Array(item.stock).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        className="mt-5 bg-white text-black rounded-lg p-3 hover:scale-105 transition-all duration-200"
                        onClick={() => removeCart(item)}
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col my-10 max-w-xs">
                  <p className="text-sm">
                    Cantidad total:
                    <span className="text-xl ml-1">
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  </p>
                  <p className="text-sm">
                    Precio total:
                    <span className="text-xl ml-1">
                      ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </span>
                  </p>
                  <button className="mt-2 bg-white text-black rounded-lg p-3 hover:scale-105 transition-all duration-200">
                    PAGAR
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Background>
    </>
  );
};

export default Cart;
