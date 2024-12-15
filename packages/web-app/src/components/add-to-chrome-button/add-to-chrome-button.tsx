import React from 'react';

interface AddToChromeButtonProps {
  chromeExtensionUrl: string;
} 

export function AddToChromeButton({
  chromeExtensionUrl
}: Readonly<AddToChromeButtonProps>) {

  return (
    <a href={chromeExtensionUrl} target='__blank'>
      <button
        className={`
          flex gap-3 justify-center items-center
          w-full min-h-[48px] rounded-md
          transition-all duration-150 active:scale-95
          font-[Gilroy] text-lg font-[500] border-2
          hover:cursor-pointer
        `}
      >
        <span className='w-[24px] h-[24px] !bg-center !bg-cover !bg-no-repeat' style={{background: `url(/assets/icons/google-chrome-icon.svg)`}} />
        <span className='font-[Gilroy] font-bold'>Add to Chrome - It's Free</span>
      </button>
    </a>
  );

} 
