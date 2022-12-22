import Background from "../../components/Background";
import Container from "../../components/Container";
import Clothes from "../../clothes.json";
import { useRouter } from "next/router";
import Image from "next/image";
import { BiShoppingBag } from "react-icons/bi";
import { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import Link from "next/link";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

const ProductScreen = () => {
  const { state, dispatch, priceTo, dolar } = useContext(Store);
  const [size, setSize] = useState<string>("");
  const router = useRouter();
  const { slug } = router.query;

  const product = Clothes.find((i) => i.slug === slug);

  if (!product) {
    return (
      <Background>
        <Container className="flex items-center justify-center">
          <h2 className="mt-10 text-3xl text-white">
            Producto no encontrado :(
          </h2>
        </Container>
      </Background>
    );
  }

  const addToCart = () => {
    const existItem = state.cart.cartItems.find(
      (i: ParsedUrlQuery) => i.slug === product.slug
    );
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
      <Head>
        <title>{`${product.name} - E-Commerce`}</title>
      </Head>
      <Background>
        <Container className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full mt-10 md:flex-row">
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
              <p className="my-1 text-xs text-gray-300 uppercase">
                {product.stock === 0 ? "sin stock" : "en stock"}
              </p>
              <p className="mb-6 text-2xl uppercase">{product.name}</p>
              <p className="mb-1 text-sm">Talle: {size}</p>
              <div className="flex gap-1 mb-5 text-gray-600">
                <button
                  className="p-3 tracking-tighter uppercase bg-white border-2 rounded focus:border-orange-600"
                  onClick={() => setSize("XS")}
                >
                  XS
                </button>
                <button
                  className="p-3 tracking-tighter uppercase bg-white border-2 rounded focus:border-orange-600"
                  onClick={() => setSize("S")}
                >
                  S
                </button>
                <button
                  className="p-3 tracking-tighter uppercase bg-white border-2 rounded focus:border-orange-600"
                  onClick={() => setSize("M")}
                >
                  M
                </button>
                <button
                  className="p-3 tracking-tighter uppercase bg-white border-2 rounded focus:border-orange-600"
                  onClick={() => setSize("L")}
                >
                  L
                </button>
                <button
                  className="p-3 tracking-tighter uppercase bg-white border-2 rounded focus:border-orange-600"
                  onClick={() => setSize("XL")}
                >
                  XL
                </button>
                <button
                  className="p-3 tracking-tighter uppercase bg-white border-2 rounded focus:border-orange-600"
                  onClick={() => setSize("XXL")}
                >
                  XXL
                </button>
              </div>
              <p className="mb-8">
                {priceTo ? (
                  <div className="flex items-center">
                    <p className="mr-2 text-xs">Valor final:</p>
                    <p className="text-2xl font-bold">
                      {product.price.toLocaleString("de-DE")} ARS
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="mr-2 text-xs">Valor final:</p>
                    <p className="text-2xl font-bold">
                      {(product.price / dolar.blue.value_sell).toFixed(2)} USD
                    </p>
                  </div>
                )}
              </p>
              <button
                className="p-3 mb-3 text-black transition-all duration-200 bg-white rounded-2xl hover:scale-105"
                onClick={addToCart}
              >
                Añadir al carrito
                <div className="flex justify-center">
                  <BiShoppingBag size={25} />
                </div>
              </button>
              <button
                className="p-2 mt-5 text-black transition-all duration-200 bg-white rounded-xl hover:scale-105"
                onClick={() => router.push("/")}
              >
                Volver a la tienda
              </button>
            </div>
          </div>
          <div className="flex flex-col mt-28">
            <p className="mb-3 uppercase">Mas vendidos</p>
            <div className="flex items-center justify-center gap-5 mb-16">
              {Clothes.slice(0, screenWidth()).map((clothes) => (
                <div
                  className="flex flex-col items-center shadow-xl"
                  key={clothes.id}
                >
                  <div
                    className="relative flex flex-col items-center cursor-pointer group"
                    onClick={() => router.push(`/product/${clothes.slug}`)}
                  >
                    <Image
                      src={clothes.image}
                      alt="/"
                      height="280"
                      width="190"
                      objectFit="cover"
                      objectPosition="center"
                      className="transition-all duration-200 rounded-md hover:scale-105 group-hover:opacity-30"
                    />
                    <div className="absolute flex-col hidden text-center group-hover:block top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
                      <div className="flex flex-col items-center">
                        <p className="mb-2 text-xs tracking-normal whitespace-nowrap md:text-base">
                          MÁS INFORMACIÓN
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link href={`/product/${clothes.slug}`}>
                    <p className="my-2 text-sm uppercase cursor-pointer hover:text-gray-300">
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
