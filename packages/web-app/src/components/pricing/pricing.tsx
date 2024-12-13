import React from 'react';

interface PriceItem {
  name: string;
  price: string;
}

interface PricingProps {
  priceItems: PriceItem[];
}

export function Pricing({
  priceItems,
}: Readonly<PricingProps>) {

  return (
    <div className='w-full'>
      <div className='pb-2 border-b-2'>
        <div className='font-[Gilroy] font-bold text-xl text-[#000000d9]'>PRICING</div>
        <div className='font-[Gilroy] text-gray-600 text-sm mb-2'>{`
          Please be advised these prices are experimental and will most likely change.
        `}</div>
      </div>
      { priceItems.map((priceItem, index) => (
        <div 
          key={`price-item-${index}`} 
          className='flex items-center gap-20 py-4 border-b-2 px-8'
        >
          <div className='font-[Gilroy] text-gray-800 text-sm font-[500]'>{priceItem.name}</div>
          <div className='flex text-gray-600 font-[Gilroy] text-[0.75rem]'>{priceItem.price}</div>
        </div>
      )) }
    </div>
  );
}
