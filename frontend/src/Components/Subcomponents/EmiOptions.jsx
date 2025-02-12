import { useState } from 'react';
import { FaTag } from 'react-icons/fa';

export const EmiOptions = () => {
  const [offers] = useState([
    {
      id: 1,
      icon: 'https://example.com/bajaj-icon.png', // Replace with your own image URL or icon
      title: 'No Cost EMI on Bajaj Finserv',
      link: '#',
    },
    {
      id: 2,
      icon: 'https://example.com/credit-card-icon.png', // Replace with your own image URL or icon
      title: 'No Cost EMI on Credit card and Debit card transaction',
      link: '#',
    },
    {
      id: 3,
      icon: 'https://example.com/pay-later-icon.png', // Replace with your own image URL or icon
      title: 'No Cost EMI on Pay Later',
      link: '#',
    },
  ]);

  return (
    <div className=" p-1 sm:p-4 bg-white shadow-md rounded-md">
      <div className="space-y-4">
        {offers.map((offer) => (
          <div key={offer.id} className="flex items-center justify-between p-1 sm:p-3 border-b">
            <div className="flex items-center gap-1 sm:gap-3">
                <div className="w-1/5">
              <FaTag className='h-4 w-4 sm:w-8 sm:h-8 text-green-700'/>
              </div>
              <span className="text-gray-800 font-medium sm:text-lg text-xs">{offer.title}</span>
            </div>
            <a href={offer.link} className="text-blue-600 hover:underline">
              <span className="sm:text-sm text-xs">View</span>
            </a>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <a href="#" className="text-blue-600 font-semibold hover:underline">
          View All Offers
        </a>
      </div>
    </div>
  );
};
