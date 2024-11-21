import React, { useState } from 'react';
import { Button } from '../button/button';

export interface FeedbackProps {
  onSubmit: (value: string) => void;
  characterLimit?: number;
}

export function Feedback({
  onSubmit,
  characterLimit=500,
}: Readonly<FeedbackProps>) {

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.length > characterLimit) return console.error('[Client]: Input length is greater than max length.');
    onSubmit(inputValue);
  };

  return (
    <div className='flex flex-col gap-2 px-4 w-full h-[400px] bg-white overflow-hidden'>
      <textarea
        name='feedback-input' 
        id='feedback-input'
        onChange={(event) => setInputValue(event.target.value)}
        placeholder='How can we make ChatGPT That better'
        className={`
          flex-grow bg-gray-50 focus:outline-none !resize-none focus:resize-none active:outline-none active:resize-none
          font-[Gilroy] font-[400] text-xl rounded-lg py-8 px-6 text-[#000000d9]
        `}
      ></textarea>
      <div className='w-full flex items-start justify-between border-t-2 resize-none'>
        <div 
          style={{ color: inputValue.length > characterLimit ? '#FF24249d' : undefined }}
          className='font-[Gilroy] font-[500] text-sm text-gray-300 mt-2'>{inputValue.length}/{characterLimit}
        </div>
        <div className='mt-2'>
          <Button type='classic' onClick={handleSubmit}>Send Feedback</Button>
        </div>
      </div>
    </div>
  );

}
