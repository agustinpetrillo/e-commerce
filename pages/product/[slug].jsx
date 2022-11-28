import Background from "../../components/Background";
import Container from "../../components/Container";
import Clothes from "../../clothes";
import { useRouter } from "next/router";
import Image from "next/image";
import { BiShoppingBag } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
import Link from "next/link";

const ProductScreen = () => {
  const { state, dispatch, priceTo, dolar } = useContext(Store);
  const [size, setSize] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  const product = Clothes.find((i) => i.slug === slug);

  useEffect(() => {
    // document.title = `${product.name} - E-Commerce`;
    document.title = "E-Commerce";
  }, []);

  if (!product) {
    return (
      <Background>
        <Container className="flex items-center justify-center">
          <h2 className="text-white text-3xl mt-10">
            Producto no encontrado :(
          </h2>
        </Container>
      </Background>
    );
  }

  const addToCart = () => {
    const existItem = state.cart.cartItems.find((i) => i.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.stock < quantity) {
      alert("Fuera de Stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  const screenWidth = () => {
    if (window.innerWidth < 640) {
      return 2;
    }
    if (window.innerWidth < 768) {
      return 3;
    }
    if (window.innerWidth < 1024) {
      return 4;
    }
    if (window.innerWidth < 1536) {
      return 5;
    }
    return 6;
  };

  return (
    <>
      <Background>
        <Container className="flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row w-full justify-center items-center mt-10">
            <div className="flex mb-6 md:mb-0">
              <Image
                src={product.image}
                alt="/"
                height="420"
                width="340"
                objectFit="cover"
                objectPosition="center"
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col md:ml-20">
              <p className="uppercase my-1 text-gray-300 text-xs">
                {product.stock === 0 ? "sin stock" : "en stock"}
              </p>
              <p className="text-2xl uppercase mb-6">{product.name}</p>
              <p className="text-sm mb-1">Talle: {size}</p>
              <div className="flex gap-1 text-gray-600 mb-5">
                <button
                  className="bg-white rounded p-3 uppercase tracking-tighter border-2 focus:border-orange-600"
                  onClick={() => setSize("XS")}
                >
                  XS
                </button>
                <button
                  className="bg-white rounded p-3 uppercase tracking-tighter border-2 focus:border-orange-600"
                  onClick={() => setSize("S")}
                >
                  S
                </button>
                <button
                  className="bg-white rounded p-3 uppercase tracking-tighter border-2 focus:border-orange-600"
                  onClick={() => setSize("M")}
                >
                  M
                </button>
                <button
                  className="bg-white rounded p-3 uppercase tracking-tighter border-2 focus:border-orange-600"
                  onClick={() => setSize("L")}
                >
                  L
                </button>
                <button
                  className="bg-white rounded p-3 uppercase tracking-tighter border-2 focus:border-orange-600"
                  onClick={() => setSize("XL")}
                >
                  XL
                </button>
                <button
                  className="bg-white rounded p-3 uppercase tracking-tighter border-2 focus:border-orange-600"
                  onClick={() => setSize("XXL")}
                >
                  XXL
                </button>
              </div>
              <p className="mb-8">
                {priceTo ? (
                  <div className="flex items-center">
                    <p className="text-xs mr-2">Valor final:</p>
                    <p className="text-2xl font-bold">
                      {product.price.toLocaleString("de-DE")} ARS
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="text-xs mr-2">Valor final:</p>
                    <p className="text-2xl font-bold">
                      {(product.price / dolar.blue.value_sell).toFixed(2)} USD
                    </p>
                  </div>
                )}
              </p>
              <button
                className="mb-3 rounded-2xl bg-white text-black p-3 hover:scale-105 duration-200 transition-all"
                onClick={addToCart}
              >
                Añadir al carrito
                <div className="flex justify-center">
                  <BiShoppingBag size={25} />
                </div>
              </button>
              <button
                className="mt-5 rounded-xl bg-white text-black p-2 hover:scale-105 duration-200 transition-all"
                onClick={() => router.push("/")}
              >
                Volver a la tienda
              </button>
            </div>
          </div>
          <div className="flex flex-col mt-28">
            <p className="uppercase mb-3">Mas vendidos</p>
            <div className="flex items-center justify-center gap-5 mb-16">
              {Clothes.slice(0, screenWidth()).map((clothes) => (
                <div
                  className="flex flex-col items-center shadow-xl"
                  key={clothes.id}
                >
                  <div
                    className="flex flex-col items-center relative group cursor-pointer"
                    onClick={() => router.push(`/product/${clothes.slug}`)}
                  >
                    <Image
                      src={clothes.image}
                      alt="/"
                      height="280"
                      width="190"
                      objectFit="cover"
                      objectPosition="center"
                      className="rounded-md hover:scale-105 duration-200 transition-all group-hover:opacity-30"
                    />
                    <div className="hidden group-hover:block flex-col absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-center">
                      <div className="flex flex-col items-center">
                        <p className="tracking-normal whitespace-nowrap mb-2 text-xs md:text-base">
                          MÁS INFORMACIÓN
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link href={`/product/${clothes.slug}`}>
                    <p className="text-sm my-2 uppercase cursor-pointer hover:text-gray-300">
                      {clothes.name}
                    </p>
                  </Link>
                  <p className="font-bold">
                    {priceTo
                      ? `${clothes.price.toLocaleString("de-DE")} ARS`
                      : // es-ES no separa con . numeros de 4 cifras
                        `${(clothes.price / dolar.blue.value_sell).toFixed(
                          2
                        )} USD`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Background>
    </>
  );
};

export default ProductScreen;
