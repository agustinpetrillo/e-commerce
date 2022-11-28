import Background from "../Background";
import Container from "../Container";
import Clothes from "../../clothes";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Store } from "../../utils/Store";

const MainSection = () => {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(16);
  const [data, setData] = useState([]);
  const { priceTo, dolar } = useContext(Store);

  const router = useRouter();

  const allCategories = [
    "Todo",
    ...new Set(Clothes.map((item) => item.category)),
  ];

  useEffect(() => {
    // API to control usd price
    if (data.length === 0) {
      setData(Clothes);
    }
    // console.log(product);
  }, [data]);

  const filterCategories = (categories) => {
    if (categories === "Todo") {
      setData(Clothes);
      return;
    }
    const filterData = Clothes.filter((item) => item.category === categories);
    setData(filterData);
  };

  return (
    <>
      <Background className="w-full min-h-screen mt-8" id="main">
        <Container>
          <div className="flex flex-col justify-center md:items-center">
            <div className="flex justify-center mb-8">
              <input
                type="text"
                placeholder="Buscar"
                className="bg-transparent border-b outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
              <AiOutlineSearch
                size={27}
                className="duration-100 cursor-pointer hover:text-gray-300"
              />
            </div>
            <ul className="flex flex-col gap-6 text-sm uppercase md:flex-row whitespace-nowrap">
              {allCategories.map((item) => (
                <li
                  key={(prev) => prev + 1}
                  className="tracking-wide"
                  onClick={() => filterCategories(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-10 my-6 md:grid-cols-4 2xl:grid-cols-5">
              {data
                .filter((item) => {
                  return search.toLowerCase() === null
                    ? item
                    : item.name.toLowerCase().includes(search);
                })
                .slice(0, visible)
                .map((clothes) => (
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
            {visible < data.length ? (
              <button
                className="my-10 mb-16 uppercase tracking-[4px] text-sm hover:text-gray-300 duration-200"
                onClick={() => setVisible((prev) => prev + 12)}
              >
                Ver más productos
              </button>
            ) : null}
          </div>
        </Container>
      </Background>
    </>
  );
};

export default MainSection;
