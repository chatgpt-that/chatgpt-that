import React from 'react';

export interface NavItem {
  label: string;
  onClick: () => void;
}

export interface SplashNavProps {
  title: string;
  logoPath: string;
  navItems: NavItem[];
}

export function SplashNav({
  title,
  logoPath,
  navItems,
}: Readonly<SplashNavProps>) {
  
  return (
    <nav className='w-full h-[84px] flex items-center justify-between border-b bg-white'>
      <div className='flex gap-4 items-center'>
        <div 
          style={{ background: `url(${logoPath})` }} 
          className='size-[42px] rounded-full border-2 border-[#407BFF] !bg-center !bg-cover !bg-no-repeat hover:cursor-pointer'
        />
        <a href={window.location.origin} className='font-[Gilroy] font-[900] text-2xl text-[#000000d9]'>{title}</a>
      </div>
      <div className='flex gap-6 items-center'>
        { navItems.map((navItem) => (
          <div 
            key={navItem.label} 
            className='font-[Gilroy] font-[600] text-[#000000d9] hover:cursor-pointer hover:underline hover:text-[#407BFF]'
            onClick={navItem.onClick}
          >
            { navItem.label }
          </div>
        )) }
      </div>
    </nav>
  );

}
