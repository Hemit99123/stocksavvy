import { FaChevronDown } from "react-icons/fa";
import MultipleSpacer from "../../../components/common/Spacers/MultipleSpacer";

const Hero = () => {
  return (
    <div className="lg:pt-20 lg:ml-32 text-center lg:text-start mb-16 relative">
      <h3 className="text-4xl md:text-7xl xl:text-8xl font-black leading-tight text-black">
        Finance is key.
      </h3>
      <p className="mt-6 mb-10 text-lg md:text-2xl lg:text-2xl text-gray-700 px-6 md:px-0">
        Stock Savvy is a financial literacy initiative that helps young and
        aspiring high school students.
      </p>

        {/* CTA Section */}
        <h2 className="text-4xl font-bold text-green-900">Try Our Platform:</h2>

        <div className="flex mt-10 gap-6">

          <a
            href="/questions"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl shadow-lg transition-all w-full md:w-64 text-lg font-semibold flex flex-col items-center"
          >
            📚 Question Bank
          </a>

          <a
            href="/forum"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl shadow-lg transition-all w-full md:w-64 text-lg font-semibold flex flex-col items-center"
          >
            📈 StockSavvy Forum
          </a>
        </div>
      
      <MultipleSpacer spacerCount={5} />
      {/* Scroll Indicator */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 animate-bounce">
        <FaChevronDown className="text-green-600 text-3xl" />
      </div>
    </div>
  );
};

export default Hero;
