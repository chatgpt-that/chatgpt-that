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
        <span className='font-[Gilroy] font-[900] text-2xl text-[#000000d9]'>VOTE</span>
        <span className='font-[Gilroy] font-[500] text-xl text-gray-400'>on the next feature!</span>
      </div>
      <div className='w-full flex justify-between'>
        { features.map((featureItem) => (
          <div 
            key={featureItem.featureId} 
            style={{ opacity: featureItem.featureId === selectedFeature ? '1' : '.35' }}
            className='flex flex-col gap-2 w-[460px] h-[220px] rounded-xl shadow-md bg-white p-6 border-[1px] border-gray-100 transition-all duration-150 hover:cursor-pointer active:scale-95 hover:!opacity-100' 
            onClick={() => onSelectFeature(featureItem.featureId)} 
          >
            <div className='font-[Gilroy] font-[700] text-xl text-[#000000d9]'>{featureItem.title}</div>
            <div className='font-[Gilroy] font-[400] text-[16px] text-gray-400'>{featureItem.description}</div>
          </div>
        )) }
      </div>
    </div>
  );

}
