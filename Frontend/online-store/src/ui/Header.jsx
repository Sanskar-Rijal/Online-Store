import { FaRegHeart, FaRegUser, FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "./Button";
import Badge from "./Badge";
import { LuLogOut, LuShoppingCart } from "react-icons/lu";

function Header() {
  const cartItems = 5;
  const user = {
    name: "Sanskar Rijal",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex  items-center justify-between">
          {/* displaying icons */}
          <Link className="flex items-center gap-2 cursor-pointer" to="/">
            {/* displaying logo  and the text */}
            <div className="h-8 w-8  rounded-lg bg-purple-600 flex items-center justify-center ">
              <LuShoppingCart className="h-5 w-5 text-white" />
            </div>
            {/* displaying name */}
            <span className="text-2xl text-gray-900 hidden font-bold sm:block">
              PurpleStore
            </span>
            <span className="text-xl text-gray-900 font-bold sm:hidden">
              PurpleStore
            </span>
          </Link>
          {/* Search Bar, which is hidden on mobile */}
          <div className="hidden  md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 " />
              <input
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-3xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="text"
                placeholder="Search Products....."
              />
            </div>
          </div>
          {/* another div for fav and cart icons */}
          <div className="flex items-center gap-2">
            {/* fav */}
            <Button
              className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              variant="ghost"
              size="icon"
              to="/wishlist"
            >
              <FaRegHeart className="h-5 w-4" />
            </Button>
            <Button
              className="relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              variant="ghost"
              size="icon"
              to="/cart"
            >
              <LuShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-purple-600 text-white border-0">
                  {cartItems}
                </Badge>
              )}
            </Button>
            {/* user menu if user is logged in  */}
            {user ? (
              //    for mobile view
              <>
                <Button
                  variant="ghost"
                  to="/userProfile"
                  className="md:hidden inline-flex gap-3  items-center justify-center  rounded-full text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none
                "
                >
                  <FaRegUser className="h-5 w-5" />
                </Button>
                {/* for desktop view */}
                <Button
                  variant="ghost"
                  to="/userProfile"
                  className="hidden md:inline-flex gap-3  items-center justify-center  rounded-full text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none
                "
                >
                  <FaRegUser className="h-5 w-5" />
                  {user.name}
                </Button>

                {/* logout Button */}
                <Button
                  className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  variant="ghost"
                  size="icon"
                  to="/"
                >
                  <LuLogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button to="/login" className="mx-4">
                Login
              </Button>
            )}
          </div>
        </div>
        {/* mobile Search bar */}
        <div className="mt-4 md:hidden">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 " />
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-3xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text"
              placeholder="Search Products....."
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
