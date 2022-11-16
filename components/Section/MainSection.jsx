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
      <Background className="min-h-screen w-full mt-8" id="main">
        <Container>
          <div className="flex flex-col md:items-center justify-center">
            <div className="flex mb-8 justify-center">
              <input
                type="text"
                placeholder="Buscar"
                className="bg-transparent border-b outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
              <AiOutlineSearch
                size={27}
                className="cursor-pointer hover:text-gray-300 duration-100"
              />
            </div>
            <ul className="flex flex-col md:flex-row gap-6 uppercase text-sm whitespace-nowrap">
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
            <div className="grid md:grid-cols-4 2xl:grid-cols-5 grid-cols-2 my-6 gap-10">
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
