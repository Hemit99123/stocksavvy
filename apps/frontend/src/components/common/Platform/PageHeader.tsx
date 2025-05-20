import { MdHomeFilled } from 'react-icons/md'

interface PageHeaderProps {
  title: string;
  description: string;
  sideComponent: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, description, sideComponent}) => {
  return (
    <div>
      {/* Header with Home link */}
      <div className="flex justify-between mx-8 mt-5 flex-col sm:flex-row">
        <a href="/" className="flex justify-center text-green-500 text-lg mb-4 sm:mb-0">
          <div className='mt-1'>
            <MdHomeFilled /> 
          </div>
          <div className='ml-1'>
            • StockSavvy
          </div>
        </a>

        <div className="flex text-gray-600 text-xs gap-2">
            {sideComponent}
        </div>
      </div>

      {/* Heading and Introduction */}
      <div className="p-8">
        <h1 className="text-4xl sm:text-6xl font-bold">{title}</h1>
        <p className="text-gray-600 text-lg mb-2">{description}</p>
      </div>  
    </div>
    )
}

export default PageHeader