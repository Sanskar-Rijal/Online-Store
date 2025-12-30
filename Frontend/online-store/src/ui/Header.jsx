import { FaRegHeart, FaRegUser, FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "./Button";
import Badge from "./Badge";
import { LuLogOut, LuShoppingCart } from "react-icons/lu";

function Header() {
  const cartItems = 5;
  const user = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* displaying icons */}
          <Link className="flex cursor-pointer items-center gap-2" to="/">
            {/* displaying logo  and the text */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
              <LuShoppingCart className="h-5 w-5 text-white" />
            </div>
            {/* displaying name */}
            <span className="hidden text-2xl font-bold text-gray-900 sm:block">
              PurpleStore
            </span>
            <span className="text-xl font-bold text-gray-900 sm:hidden">
              PurpleStore
            </span>
          </Link>
          {/* Search Bar, which is hidden on mobile */}
          <div className="mx-8 hidden max-w-md flex-1 md:flex">
            <div className="relative w-full">
              <FaSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <input
                className="w-full rounded-3xl border border-gray-200 bg-white py-2 pr-4 pl-10 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                type="text"
                placeholder="Search Products....."
              />
            </div>
          </div>
          {/* another div for fav and cart icons */}
          <div className="flex items-center gap-2">
            {/* fav */}
            <Button
              className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              variant="ghost"
              size="icon"
              to="/wishlist"
            >
              <FaRegHeart className="h-5 w-4" />
            </Button>
            <Button
              className="relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              variant="ghost"
              size="icon"
              to="/cart"
            >
              <LuShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center border-0 bg-purple-600 p-0 text-xs text-white">
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
                  className="inline-flex items-center justify-center gap-3 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50 md:hidden"
                >
                  <FaRegUser className="h-5 w-5" />
                </Button>
                {/* for desktop view */}
                <Button
                  variant="ghost"
                  to="/userProfile"
                  className="hidden items-center justify-center gap-3 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50 md:inline-flex"
                >
                  <FaRegUser className="h-5 w-5" />
                  {user.name}
                </Button>

                {/* logout Button */}
                <Button
                  className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  variant="ghost"
                  size="icon"
                  to="/"
                >
                  <LuLogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                to="/login"
                className="mx-4 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Login
              </Button>
            )}
          </div>
        </div>
        {/* mobile Search bar */}
        <div className="mt-4 md:hidden">
          <div className="relative w-full">
            <FaSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <input
              className="w-full rounded-3xl border border-gray-200 bg-white py-2 pr-4 pl-10 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
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
