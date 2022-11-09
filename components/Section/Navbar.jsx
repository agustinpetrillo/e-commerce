import { BiShoppingBag } from "react-icons/bi";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
const MenuNavbar = dynamic(() => import("./MenuNavbar"));

const Navbar = () => {
  const { state, priceTo, setPriceTo } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <div className="sticky top-0 min-h-0 w-full p-6 md:p-10 lg:px-52 bg-black/50 z-30 shadow-xl">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="uppercase whitespace-nowrap cursor-pointer text-2xl md:text-4xl">
              Logo
            </h1>
          </Link>
          <div className="flex items-center gap-10">
            <select
              defaultValue={priceTo}
              className="text-white bg-transparent outline-none cursor-pointer font-bold"
              onChange={() => setPriceTo(!priceTo)}
            >
              <option className="text-teal-300 bg-black" value="ARS">
                ARS
              </option>
              <option className="text-green-600 bg-black" value="USD">
                USD
              </option>
            </select>
            <div className="flex items-end gap-1">
              <Link href="/Cart">
                <BiShoppingBag
                  size={27}
                  className="cursor-pointer hover:text-gray-300 duration-100"
                />
              </Link>
              <p className="text-sm">{cartItemsCount}</p>
            </div>
            <MenuNavbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
