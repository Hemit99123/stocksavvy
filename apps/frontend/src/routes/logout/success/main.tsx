const LogoutSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-green-100 to-green-200 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center animate-bounce">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
          Logged Out Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          You have been securely logged out. We hope to see you again soon!
        </p>
        <a
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded transition duration-300 ease-in-out"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default LogoutSuccess;
