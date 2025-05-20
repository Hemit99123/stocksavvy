const LogoutError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-200 via-red-100 to-red-200 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-red-700 mb-4">
          Something Went Wrong!
        </h1>
        <p className="text-gray-600 mb-6">
          An unexpected error has occurred. Please try again later or contact our support team for assistance.
        </p>
        <a
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition duration-300 ease-in-out"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default LogoutError;
