import React, { useEffect, useState } from 'react';

export interface FAQ {
  question: string;
  answer: string;
  isOpened?: boolean;
}

export interface FAQProps {
  faqs: FAQ[];
}

export function FAQ({
  faqs: externalFaqs,
}: Readonly<FAQProps>) {

  const [faqs, setFaqs] = useState(externalFaqs);

  const handleToggleFaq = (faqToToggle: FAQ) => {
    setFaqs(faqs.map((faq) => {
      if (faq.question !== faqToToggle.question) return faq;
      return { ...faq, isOpened: !faq.isOpened };
    }));
  };

  useEffect(() => {
    setFaqs(externalFaqs);
  }, [externalFaqs]);

  return (
    <div className='w-full'>
      <div className='font-[Gilroy] font-[600] text-3xl text-[#000000d9] h-[48px] border-b-2'>FAQ</div>
      <div>
        { faqs.map((faq) => (
          <div key={faq.question} className='py-6 border-b-2'>
            <div className='flex justify-between items-center gap-8'>
              <div className='flex-grow font-[Gilroy] font-[600] text-2xl text-[#000000d9]'>{faq.question}</div>
              <div 
                onClick={() => handleToggleFaq(faq)} 
                className='w-[120px] hover:cursor-pointer flex justify-end' 
              >
                <div 
                  style={{ rotate: faq.isOpened ? '90deg' : '0deg' }}
                  className={`w-[16px] h-[16px] !bg-center !bg-cover !bg-no-repeat bg-[url('/assets/icons/arrow-right-icon.svg')] transition-all duration-150`}
                />
              </div>
            </div>
            { faq.isOpened && (
              <div className='mt-2 font-[Gilroy] font-[400] text-xl text-gray-400 flex-wrap'>{faq.answer}</div>
            ) }
          </div>
        )) }
      </div>
    </div>
  );
  
}
