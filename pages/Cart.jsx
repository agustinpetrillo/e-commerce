import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Background from "../components/Background";
import Container from "../components/Container";
import { Store } from "../utils/Store";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeCart = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCart = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <>
      <Head>
        <title>Carrito - E-commerce</title>
      </Head>
      <Background>
        <Container>
          <div className="flex flex-col items-center my-5 text-center">
            <h1 className="mb-5">Carrito de compras</h1>
            {cartItems.length === 0 ? (
              <div className="mt-10">
                <p>El carrito esta vacio</p>
                <Link href="/">
                  <button className="rounded-2xl bg-white text-black p-3 hover:scale-105 duration-200 transition-all">
                    Tienda
                  </button>
                </Link>
              </div>
            ) : (
              <div className="gap-3 grid grid-cols-4">
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
                    <p className="my-1">Producto: {item.name}</p>
                    <p>Precio: ${item.price * item.quantity} ARS</p>
                    <div className="flex mt-2 gap-2">
                      <p>Cantidad:</p>
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCart(item, e.target.value)}
                        className="text-black text-sm rounded-sm outline-none"
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
                <div className="flex flex-col items-center justify-end">
                  <p>
                    Cantidad total:{" "}
                    {cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </p>
                  <p>
                    Precio total: $
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </p>
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
