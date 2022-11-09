import Link from "next/link";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsBoxSeam, BsCreditCard2Back, BsDiscord } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";
import Background from "../Background";
import Container from "../Container";

const Footer = () => {
  return (
    <>
      <Background className="w-full min-h-0">
        <Container className="flex flex-col justify-center py-10 px-20">
          <div className="flex md:justify-between justify-center items-center">
            <div className="flex-col hidden md:block">
              <ul className="text-xl">
                <li className="my-5 hover:scale-110 duration-200" key={0}>
                  <Link href="/">Inicio</Link>
                </li>
                <li className="my-5 hover:scale-110 duration-200" key={1}>
                  Productos
                </li>
                <li className="my-5 hover:scale-110 duration-200" key={2}>
                  Contactos
                </li>
                <li className="my-5 hover:scale-110 duration-200" key={3}>
                  Devoluciones
                </li>
                <li className="my-5 hover:scale-110 duration-200" key={4}>
                  Envíos
                </li>
              </ul>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="my-2 flex items-center">
                <BsBoxSeam size={35} className="mr-3" />
                <div>
                  <h5 className="uppercase tracking-normal">
                    Enviamos tu compra
                  </h5>
                  <p className="text-xs tracking-tight">
                    Entregas a todo el mundo
                  </p>
                </div>
              </div>
              <div className="my-2 flex items-center">
                <BsCreditCard2Back size={35} className="mr-3" />
                <div>
                  <h5 className="uppercase tracking-normal">
                    Pagá como quieras
                  </h5>
                  <p className="text-xs tracking-tight">
                    Tarjetas de débito o crédito
                  </p>
                </div>
              </div>
              <div className="my-2 flex items-center">
                <MdOutlineVerified size={35} className="mr-3" />
                <div>
                  <h5 className="uppercase tracking-normal">
                    Comprá con seguridad
                  </h5>
                  <p className="text-xs tracking-tight">
                    Tus datos siempre protegidos
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center my-6 md:my-0">
            <div className="flex gap-4 mb-5">
              <a
                href="/"
                className="hover:scale-125 duration-200 transition-all"
                rel="noreferrer"
              >
                <AiOutlineInstagram size={32} />
              </a>
              <a
                href="/"
                className="hover:scale-125 duration-200 transition-all"
                rel="noreferrer"
              >
                <BsDiscord size={32} />
              </a>
            </div>
            <div className="text-center whitespace-nowrap">
              <p className="my-3 text-sm">E-COMMERCE@GMAIL.COM</p>
              <p className="tracking-tight text-xs">
                Copyright - Derechos reservados
              </p>
            </div>
          </div>
        </Container>
      </Background>
    </>
  );
};

export default Footer;
