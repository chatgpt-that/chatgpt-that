import React, { useEffect, useState } from 'react';
import { NavItem, SplashNav } from '../../components/splash-nav/splash-nav';
import { faqs, featureVoteItems, splashNavTitle } from './splash-data';
import { FeatureVote } from '../../components/feature-vote/feature-vote';
import { Feedback } from '../../components/feedback/feedback';
import { FAQ } from '../../components/faq/faq';
import { useAuth0 } from '@auth0/auth0-react';
import { getFeatureVote, upsertFeatureVote } from '../../api/feature-vote.api';

export function SplashPage() {
  const { user, isAuthenticated, loginWithPopup, logout, getIdTokenClaims } = useAuth0();
  const [selectedVoteFeature, setSelectedVoteFeature] = useState(-1);

  const handleLoginByGoogle = async () => {
    await loginWithPopup();
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleSubmitFeedback = (feedback: string) => {
    window.alert('Feature not yet implemented.');
  };

  const handleFeatureVote = async (vote: 0 | 1 | 2) => {
    if (!isAuthenticated) return await loginWithPopup();
    const id_token = (await getIdTokenClaims())?.__raw!;
    try {
      await upsertFeatureVote({ id_token, vote });
      setSelectedVoteFeature(vote);
    } catch (err) {
      console.error(`[Client]: Failed to save feature vote - ${err}`);
    }
  };

  const getAndSetFeatureVote = async () => {
    try {
      const id_token = (await getIdTokenClaims())?.__raw!;
      const updatedSelectedVoteFeature = await getFeatureVote({ id_token });
      setSelectedVoteFeature(updatedSelectedVoteFeature);
    } catch (err) {
      console.error(`[Client]: Failed to get feature vote - ${err}`);
    }
  };

  const splashNavItems: NavItem[] = isAuthenticated
  ? [{label: 'Logout', onClick: handleLogout }]
  : [{label: 'Login (Google)', onClick: handleLoginByGoogle }];

  useEffect(() => {
    if (!isAuthenticated) return;
    getAndSetFeatureVote();
  }, [isAuthenticated]);
  
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
        onSelectFeature={(vote) => handleFeatureVote(vote as 0 | 1 | 2)}
      />
      <iframe className='rounded-xl' width="1280" height="720" src="https://www.youtube.com/embed/CsrmS0id6So?si=VHZiivbn3xoC1Q6t" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <div className='w-full grid grid-cols-2 gap-[50px]'>
        <Feedback onSubmit={handleSubmitFeedback} characterLimit={450}/>
        <FAQ faqs={faqs}/>
      </div>
    </div>
  );
}
