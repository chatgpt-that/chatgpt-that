import React from 'react';

export interface FeatureItem {
  title: string;
  featureId: number;
  description: string;
}

export interface FeatureVoteProps {
  features: FeatureItem[];
  selectedFeature?: number;
  onSelectFeature: (selectedFeature: number) => void;
}

export function FeatureVote({
  features,
  onSelectFeature,
  selectedFeature,
}: Readonly<FeatureVoteProps>) {

  return (
    <div className='w-full relative'>
      <div className='flex gap-2 justify-self-center items-center mb-6'>
        <span className='font-[Gilroy] font-bold text-xl text-[#000000d9]'>VOTE</span>
        <span className='font-[Gilroy] font-[500] text-lg text-gray-600'>on an upcoming feature!</span>
      </div>
      <div className='w-full flex flex-col gap-2 lg:gap-0 lg:flex-row items-center lg:justify-between'>
        { features.map((featureItem) => (
          <div 
            key={featureItem.featureId} 
            style={{ opacity: featureItem.featureId === selectedFeature ? '1' : '.65' }}
            className='flex flex-col gap-2 w-[324px] h-[180px] rounded-xl shadow-md bg-white p-6 border-[1px] border-gray-100 transition-all duration-150 hover:cursor-pointer active:scale-95 hover:!opacity-100' 
            onClick={() => onSelectFeature(featureItem.featureId)} 
          >
            <div className='font-[Gilroy] font-[700] text text-[#000000d9]'>{featureItem.title}</div>
            <div className='font-[Gilroy] font-[400] text-[14px] text-gray-600'>{featureItem.description}</div>
          </div>
        )) }
      </div>
    </div>
  );

}
