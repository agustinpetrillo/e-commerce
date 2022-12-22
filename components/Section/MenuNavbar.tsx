import Background from "../Background";
import Container from "../Container";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useContext, useState } from "react";
import Link from "next/link";
import { Store } from "../../utils/Store";

const MenuNavbar = () => {
  const [nav, setNav] = useState<boolean>(true);
  const { setPriceTo } = useContext(Store);
  return (
    <>
      <div className="z-50 hidden md:block" onClick={() => setNav(!nav)}>
        {nav ? (
          <AiOutlineMenu
            size={27}
            className="duration-100 cursor-pointer hover:text-gray-300"
          />
        ) : (
          <AiOutlineClose
            size={27}
            className="duration-100 cursor-pointer hover:text-gray-300"
          />
        )}
      </div>
      <Background
        className={
          nav
            ? "hidden"
            : "flex min-h-screen w-full top-0 left-0 z-40 absolute bg-all"
        }
      >
        <Container>
          <div className="flex flex-col items-center justify-center">
            <ul className="flex gap-4 p-4 my-5 border rounded-xl">
              <li
                className="font-bold duration-300 hover:text-teal-300"
                key={0}
                onClick={() => setPriceTo(true)}
              >
                ARS
              </li>
              <li
                className="font-bold duration-300 hover:text-green-600"
                key={1}
                onClick={() => setPriceTo(false)}
              >
                USD
              </li>
            </ul>
            <ul className="text-2xl text-center">
              <li className="my-5 duration-300 hover:scale-125" key={0}>
                Inicio
              </li>
              <li className="my-5 duration-300 hover:scale-125" key={1}>
                Productos
              </li>
              <li className="my-5 duration-300 hover:scale-125" key={2}>
                Contactos
              </li>
              <li className="my-5 duration-300 hover:scale-125" key={3}>
                Devoluciones
              </li>
              <li className="my-5 duration-300 hover:scale-125" key={4}>
                Envíos
              </li>
            </ul>
            <a href="#" className="my-5">
              <BsInstagram
                size={27}
                className="duration-300 hover:text-gray-300 hover:scale-125"
              />
            </a>
            <Link href="/">
              <h1 className="my-5 cursor-pointer">E-COMMERCE</h1>
            </Link>
            <div className="flex gap-2">
              <p className="duration-100 cursor-pointer hover:text-gray-300">
                Crear cuenta
              </p>
              <p>|</p>
              <p className="duration-100 cursor-pointer hover:text-gray-300">
                Iniciar sesión
              </p>
            </div>
          </div>
        </Container>
      </Background>
    </>
  );
};

export default MenuNavbar;
