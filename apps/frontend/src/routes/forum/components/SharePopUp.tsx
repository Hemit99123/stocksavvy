"use client";

import useSharePopupStore from "../../../store/sharepopup";
import { FaLinkedin, FaReddit, FaWhatsapp } from "react-icons/fa";


const SharePopUp = () => {

    const status = useSharePopupStore((state) => state.status)
    const togglePopupStatus = useSharePopupStore((state) => state.toggleStatus)

  if (!status) return null; // Prevents rendering when closed
  const url = window.location

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* MODAL CONTAINER */}
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded-xl shadow-lg">
        {/* MODAL HEADER */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <p className="text-xl font-bold text-gray-800">Share Modal</p>
          <button
            onClick={togglePopupStatus}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 text-gray-600"
          >
            &times;
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="mt-4">
          <p className="text-sm">Share this link via</p>
          
          <div className="flex justify-around my-4">
            {[
              { platform: "LinkedIn", icon: <FaLinkedin />, color: "bg-blue-600", shareLink: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
              { platform: "WhatsApp", icon: <FaWhatsapp />, color: "bg-green-600", shareLink: `https://api.whatsapp.com/send?text=Check%20this%20out!%20${url}`},
              { platform: "Reddit", icon: <FaReddit />, color: "bg-orange-600", shareLink: `https://reddit.com/submit?url=${url}&title=Check%20this%20out!`},
            ].map(({ platform, icon, color, shareLink }) => (
              <a
                href={shareLink || ""}
                key={platform}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color} shadow-lg hover:opacity-80`}
                aria-label={`Share on ${platform}`}
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-sm">Or copy link</p>
          <div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-2 px-2 rounded-lg">
            <input
              type="text"
              className="outline-none bg-transparent w-full ml-2 text-gray-700"
              value={`${url}`}
              readOnly
            />
            <button
              onClick={() => navigator.clipboard.writeText(`${url}`)}
              className="px-4 py-1 bg-black text-white rounded-lg"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePopUp;
