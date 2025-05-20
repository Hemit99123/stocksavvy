'use client';

import { useEffect, useState } from "react";
import type { MenuItem } from "../../types/navbar";
import { getMenuItems } from "../../data/navbar";

const NavBar = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    const handleGetMenuItems = async () => {
      const menuItems = await getMenuItems()
      setMenuItems(menuItems)
    }

    handleGetMenuItems()
  }, [])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <div className="flex items-center">
              <img src="/images/logo.png" height={30} width={75} alt="logo" />
              <span className="font-medium text-lg mb-3">
                StockSavvy
              </span>
            </div>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {menuItems.map((item: MenuItem) => (
            <a
              key={item.display}
              href={item.pathname}
              className="text-sm font-semibold"
            >
              {item.display}
            </a>
          ))}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {menuItems.map((item: MenuItem) => (
                    <a
                      key={item.display}
                      href={item.pathname}
                      className="block rounded-lg py-2 text-sm font-semibold hover:bg-gray-50"
                    >
                      {item.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
