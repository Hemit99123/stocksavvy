"use client"

import { FaMailBulk, FaPhone, FaInstagram, FaArrowUp } from "react-icons/fa"
import { useCallback } from "react"

const Footer = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <footer className="w-full">
      {/* Main Footer */}
      <div className="bg-green-500 pt-12 md:pt-24 pb-6 md:pb-8 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* CTA Section */}
          <div className="mb-8 md:mb-10">
            <p className="text-white/80 mb-1 md:mb-2 uppercase text-sm md:text-base">Got a question in mind?</p>
            <h2 className="text-white text-4xl sm:text-5xl md:text-7xl font-light">Let&apos;s talk</h2>
            <div className="text-white flex items-center mt-3 md:mt-4 space-x-3 md:space-x-4">
              <FaPhone className="text-sm md:text-base" />
              <p className="text-sm md:text-base">(123)-456-7890</p>
            </div>

            <div className="text-white flex items-center mt-2 md:mt-4 space-x-3 md:space-x-4">
              <FaMailBulk className="text-sm md:text-base" />
              <p className="text-sm md:text-base break-all md:break-normal">stocksavvy00@gmail.com</p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <div className="flex gap-6 items-center">
              <a href="/privacy-policy" className="text-white/80 hover:text-white text-xs sm:text-sm">
                Privacy Policy
              </a>
              <a
                href="https://www.instagram.com/stock.savvy_?igsh=dmxza2RkYmY0c3o4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white text-xs sm:text-sm flex items-center gap-1"
              >
                <FaInstagram className="text-sm md:text-base" />
                Instagram
              </a>
              <button
                onClick={scrollToTop}
                className="text-white/80 hover:text-white text-xs sm:text-sm flex items-center gap-1 cursor-pointer"
                aria-label="Scroll to top"
              >
                <FaArrowUp className="text-sm md:text-base" />
                Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

