import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  maxWidth?: number;
  type?: 'classic' | 'primary';
  disabled?: boolean;
  children: JSX.Element | string;
}

export function Button({
  onClick,
  maxWidth,
  children,
  disabled=false,
  type='primary',
}: Readonly<ButtonProps>) {
  
  return (
    <button 
      className={`
        w-full min-h-[48px] px-8 font-[400] rounded-md
        transition-all duration-150 active:scale-95
        font-[Gilroy] text-lg
        ${type === 'classic' && 'border-2 text-[#000000d9]'}
        ${type === 'primary' && 'border-none bg-[#407BFF] text-white'}
        ${disabled && 'opacity-50 hover:cursor-not-allowed active:!scale-100'}
      `}
      style={{ maxWidth: maxWidth ? `${maxWidth}px` : undefined }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  )

}
