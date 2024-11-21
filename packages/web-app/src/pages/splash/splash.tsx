import React, { useState } from 'react';
import { NavItem, SplashNav } from '../../components/splash-nav/splash-nav';
import { faqs, featureVoteItems, splashNavTitle } from './splash-data';
import { FeatureVote } from '../../components/feature-vote/feature-vote';
import { Feedback } from '../../components/feedback/feedback';
import { FAQ } from '../../components/faq/faq';

export function SplashPage() {
  const [user, setUser] = useState(null);
  const [selectedVoteFeature, setSelectedVoteFeature] = useState(0);

  const handleLoginByGoogle = () => {
    window.alert('Feature not yet implemented.');
  };

  const handleSubmitFeedback = (feedback: string) => {
    window.alert('Feature not yet implemented.');
  };

  const splashNavItems: NavItem[] = [
    { label: 'Login (Google)', onClick: handleLoginByGoogle },
  ];

  return (
    <div className='flex flex-col gap-24 mb-24 items-center'>
      <SplashNav 
        title={splashNavTitle}
        navItems={splashNavItems}
        logoPath='assets/icons/chatgpt-that-icon.svg'
      />
      <div className='flex flex-col gap-4 items-center'>
        <div className='font-[Gilroy] font-[900] text-7xl text-[#000000d9]'>CHATGPT THAT</div>
        <div className='font-[Gilroy] font-[400] text-2xl text-gray-300'>Imagine If ChatGPT could see what you see. Now it can.</div>
      </div>
      <FeatureVote 
        features={featureVoteItems}
        selectedFeature={selectedVoteFeature}
        onSelectFeature={(selectedVoteFeature) => setSelectedVoteFeature(selectedVoteFeature)}
      />
      <iframe className='rounded-xl' width="1280" height="720" src="https://www.youtube.com/embed/CsrmS0id6So?si=VHZiivbn3xoC1Q6t" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <div className='w-full grid grid-cols-2 gap-[50px]'>
        <Feedback onSubmit={handleSubmitFeedback} characterLimit={450}/>
        <FAQ faqs={faqs}/>
      </div>
    </div>
  );
}
