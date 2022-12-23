import { BiShoppingBag } from "react-icons/bi";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
const MenuNavbar = dynamic(() => import("./MenuNavbar"));

const Navbar = () => {
  const { state, priceTo, setPriceTo } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((a: number, c: any) => a + c.quantity, 0)
    );
  }, [cart.cartItems]);

  return (
    <>
      <div className="sticky top-0 z-30 w-full min-h-0 p-6 shadow-xl md:p-10 lg:px-52 bg-black/50">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl uppercase cursor-pointer whitespace-nowrap md:text-4xl">
              Logo
            </h1>
          </Link>
          <div className="flex items-center gap-10">
            <select
              defaultValue={priceTo}
              className="font-bold text-white bg-transparent outline-none cursor-pointer"
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
                  className="duration-100 cursor-pointer hover:text-gray-300"
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
