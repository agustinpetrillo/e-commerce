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
        <Container className="flex flex-col justify-center px-20 py-10">
          <div className="flex items-center justify-center md:justify-between">
            <div className="flex-col hidden md:block">
              <ul className="text-xl">
                <li className="my-5 duration-200 hover:scale-110" key={0}>
                  <Link href="/">Inicio</Link>
                </li>
                <li className="my-5 duration-200 hover:scale-110" key={1}>
                  Productos
                </li>
                <li className="my-5 duration-200 hover:scale-110" key={2}>
                  Contactos
                </li>
                <li className="my-5 duration-200 hover:scale-110" key={3}>
                  Devoluciones
                </li>
                <li className="my-5 duration-200 hover:scale-110" key={4}>
                  Envíos
                </li>
              </ul>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="flex items-center my-2">
                <BsBoxSeam size={35} className="mr-3" />
                <div>
                  <h5 className="tracking-normal uppercase">
                    Enviamos tu compra
                  </h5>
                  <p className="text-xs tracking-tight">
                    Entregas a todo el mundo
                  </p>
                </div>
              </div>
              <div className="flex items-center my-2">
                <BsCreditCard2Back size={35} className="mr-3" />
                <div>
                  <h5 className="tracking-normal uppercase">
                    Pagá como quieras
                  </h5>
                  <p className="text-xs tracking-tight">
                    Tarjetas de débito o crédito
                  </p>
                </div>
              </div>
              <div className="flex items-center my-2">
                <MdOutlineVerified size={35} className="mr-3" />
                <div>
                  <h5 className="tracking-normal uppercase">
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
                href="https://www.instagram.com"
                className="transition-all duration-200 hover:scale-125"
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineInstagram size={32} />
              </a>
              <a
                href="https://www.discord.com"
                className="transition-all duration-200 hover:scale-125"
                rel="noreferrer"
                target="_blank"
              >
                <BsDiscord size={32} />
              </a>
            </div>
            <div className="text-center whitespace-nowrap">
              <p className="my-3 text-sm">E-COMMERCE@GMAIL.COM</p>
              <p className="text-xs tracking-tight">
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
