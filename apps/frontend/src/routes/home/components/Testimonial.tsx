import Header from './common/Header';
import TestimonialCard from './common/TestimonialCard';
import {testimonials} from '../../../data/testimonial'
import MultipleSpacer from '../../../components/common/Spacers/MultipleSpacer';

const Testimonial = () => {

  return (
    <div className="mt-16 text-center">
      <Header 
        smalltext="Our testimonials"
        title="Hear from our members"
      />
      <p className="mt-4 font-light">Real stories vouching for the value gained from StockSavvy.</p>

      <div className="flex flex-wrap justify-center gap-8 mt-8 lg:space-x-12">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index}
            text={testimonial.text}
            name={testimonial.name}
            date={testimonial.date}
            rotate={testimonial.rotate}
          />
        ))}
      </div>

      <MultipleSpacer 
        spacerCount={4}
      />
    </div>
  );
};

export default Testimonial;
