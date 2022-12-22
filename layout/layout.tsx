import Background from "../components/Background";
import Footer from "../components/Section/Footer";
import Navbar from "../components/Section/Navbar";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Background className="bg-all">
        <Navbar />
        {children}
        <Footer />
      </Background>
    </>
  );
};

export default Layout;
