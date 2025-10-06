import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Search from "../Search";
import * as Popover from "@radix-ui/react-popover";
import { useUserProfile } from "../../hooks/useUserProfile";

export default function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { avatar, currentUser, setCurrentUser } = useUserProfile();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 856);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full mx-auto h-24 px-4 lg:px-16 flex items-center justify-between md:justify-between shadow-md bg-white rounded-b-xl mt-2 mb-4">
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsNavbarOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <Link to="/" className="md:px-10 ml-12 flex-shrink-0 cursor-pointer">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shadow-md bg-gradient-to-tr from-blue-500 to-purple-600 p-1 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          />
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="hidden md:block mr-8">
            <Search />
          </div>

          {/* User */}
          <div>
            {currentUser ? (
              <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
                <Popover.Trigger asChild>
                  <div
                    onClick={() => isDesktop && setIsOpen(true)}
                    className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.2 0-9.5 1.6-9.5 4.9V22h19v-3.1c0-3.3-6.3-4.9-9.5-4.9z" />
                      </svg>
                    )}
                  </div>
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content
                    side="bottom"
                    align="end"
                    className=" bg-white p-4 shadow-lg border border-gray-200 rounded-md w-64 z-50"
                    onClick={() => isDesktop && setIsOpen(false)}
                  >
                    <p className="font-semibold mb-2 text-gray-800">
                      Xin chào,{" "}
                      <span className="text-sky-600">{currentUser.name}</span>
                    </p>

                    <Link
                      to="/account"
                      className="block w-full text-left text-gray-700 hover:bg-sky-100 hover:text-sky-800 rounded px-3 py-2 transition"
                    >
                      Quản lý hồ sơ
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="mt-2 block w-full text-left text-red-600 hover:bg-red-100 hover:text-red-700 rounded px-3 py-2 transition outline-none cursor-pointer"
                    >
                      Đăng xuất
                    </button>

                    <Popover.Arrow className="fill-white drop-shadow" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            ) : (
              <Link
                to="/login"
                className="bg-gray-800 px-3 py-2 lg:px-5 lg:py-3  rounded-lg hover:bg-gray-700 cursor-pointer"
              >
                <span className="text-white text-base lg:text-lg font-semibold">
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-[500] bg-black/50 bg-opacity-40 transition-opacity ${
          isNavbarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsNavbarOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 z-[1000] w-70 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsNavbarOpen(false)}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <nav className="flex flex-col items-center p-6 gap-6">
          {/* Avatar */}
          <div className="w-14 h-14 relative rounded-full border-2 border-gray-500 shadow-lg overflow-hidden">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-14 h-14 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.2 0-9.5 1.6-9.5 4.9V22h19v-3.1c0-3.3-6.3-4.9-9.5-4.9z" />
              </svg>
            )}
          </div>

          {/* Search */}
          <div>
            <Search />
          </div>
        </nav>
      </aside>
    </>
  );
}
