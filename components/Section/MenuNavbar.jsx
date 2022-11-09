import Background from "../Background";
import Container from "../Container";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useContext, useState } from "react";
import Link from "next/link";
import { Store } from "../../utils/Store";

const MenuNavbar = () => {
  const [nav, setNav] = useState(true);
  const { setPriceTo } = useContext(Store);
  return (
    <>
      <div className="hidden md:block z-50" onClick={() => setNav(!nav)}>
        {nav ? (
          <AiOutlineMenu
            size={27}
            className="cursor-pointer hover:text-gray-300 duration-100"
          />
        ) : (
          <AiOutlineClose
            size={27}
            className="cursor-pointer hover:text-gray-300 duration-100"
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
            <ul className="flex gap-4 border p-4 rounded-xl my-5">
              <li
                className="hover:text-teal-300 duration-300 font-bold"
                key={0}
                onClick={() => setPriceTo(true)}
              >
                ARS
              </li>
              <li
                className="hover:text-green-600 duration-300 font-bold"
                key={1}
                onClick={() => setPriceTo(false)}
              >
                USD
              </li>
            </ul>
            <ul className="text-center text-2xl">
              <li className="my-5 hover:scale-125 duration-300" key={0}>
                Inicio
              </li>
              <li className="my-5 hover:scale-125 duration-300" key={1}>
                Productos
              </li>
              <li className="my-5 hover:scale-125 duration-300" key={2}>
                Contactos
              </li>
              <li className="my-5 hover:scale-125 duration-300" key={3}>
                Devoluciones
              </li>
              <li className="my-5 hover:scale-125 duration-300" key={4}>
                Envíos
              </li>
            </ul>
            <a href="#" className="my-5">
              <BsInstagram
                size={27}
                className="hover:text-gray-300 duration-300 hover:scale-125"
              />
            </a>
            <Link href="/">
              <h1 className="my-5 cursor-pointer">E-COMMERCE</h1>
            </Link>
            <div className="flex gap-2">
              <p className="cursor-pointer hover:text-gray-300 duration-100">
                Crear cuenta
              </p>
              <p>|</p>
              <p className="cursor-pointer hover:text-gray-300 duration-100">
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
