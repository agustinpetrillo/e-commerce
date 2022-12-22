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

  const removeCart = (item: object) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCart = (item: object, qty: string) => {
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
              <div className="flex flex-col items-center max-w-xs mt-10">
                <p>El carrito esta vacio :(</p>
                <Link href="/">
                  <button className="w-full p-3 mt-2 text-black transition-all duration-200 bg-white rounded-2xl hover:scale-105">
                    Tienda
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-4 gap-5">
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
                        <span className="ml-1 text-lg">{item.name}</span>
                      </p>
                      <p className="text-xs">
                        Precio:{" "}
                        <span className="ml-1 text-lg">
                          ${item.price * item.quantity} ARS
                        </span>
                      </p>
                      <div className="flex gap-2 mt-2">
                        <p className="text-xs">Cantidad:</p>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateCart(item, e.target.value)}
                          className="ml-1 text-sm text-black rounded-sm outline-none"
                        >
                          {[...Array(item.stock).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        className="p-3 mt-5 text-black transition-all duration-200 bg-white rounded-lg hover:scale-105"
                        onClick={() => removeCart(item)}
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col max-w-xs my-10">
                  <p className="text-sm">
                    Cantidad total:
                    <span className="ml-1 text-xl">
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  </p>
                  <p className="text-sm">
                    Precio total:
                    <span className="ml-1 text-xl">
                      ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </span>
                  </p>
                  <button className="p-3 mt-2 text-black transition-all duration-200 bg-white rounded-lg hover:scale-105">
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
