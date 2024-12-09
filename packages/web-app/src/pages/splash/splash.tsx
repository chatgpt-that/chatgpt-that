import React, { useEffect, useState } from 'react';
import { NavItem, SplashNav } from '../../components/splash-nav/splash-nav';
import { faqs, featureVoteItems, splashNavTitle } from './splash-data';
import { FeatureVote } from '../../components/feature-vote/feature-vote';
import { Feedback } from '../../components/feedback/feedback';
import { FAQ } from '../../components/faq/faq';
import { useAuth0 } from '@auth0/auth0-react';
import { getFeatureVote, upsertFeatureVote } from '../../api/feature-vote.api';
import { sendFeedback } from '../../api/feedback.api';
import { AddToChromeButton } from '../../components/add-to-chrome-button/add-to-chrome-button';

export function SplashPage() {
  const { user, isAuthenticated, loginWithPopup, logout, getIdTokenClaims } = useAuth0();
  const [selectedVoteFeature, setSelectedVoteFeature] = useState(-1);
  const [feedbackValue, setFeedbackValue] = useState(window.localStorage.getItem('cached-feedback') ?? '');

  const handleLoginByGoogle = async () => {
    await loginWithPopup();
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleSubmitFeedback = async (feedback: string) => {
    try {
      window.localStorage.setItem('cached-feedback', feedback);
      if (!isAuthenticated) return await loginWithPopup();
      const id_token = (await getIdTokenClaims())?.__raw!;
      await sendFeedback({
        id_token,
        feedbackMessage: feedback,
      });
      setFeedbackValue('');
      window.localStorage.removeItem('cached-feedback');
    } catch (err) {
      console.error(`[Client]: Failed to send feedback - ${err}`);
    }
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
    <div className='flex flex-col gap-28 mb-24 items-center'>
      <SplashNav 
        title={splashNavTitle}
        navItems={splashNavItems}
        logoPath='assets/icons/chatgpt-that-icon.svg'
      />
      <div className='flex flex-col gap-4 items-center'>
        <div className='font-[Gilroy] font-[900] text-5xl text-[#000000d9]'>CHATGPT THAT</div>
        <div className='font-[Gilroy] font-[400] text-xl text-gray-500'>Imagine If ChatGPT can see what you see. Now it can.</div>
        <div className='w-[208px] mt-2'><AddToChromeButton chromeExtensionUrl='https://chromewebstore.google.com/detail/chatgpt-that/blcgpfjbeleilmpmhlcmmeokfmpbmlch'/></div>
      </div>
      <FeatureVote 
        features={featureVoteItems}
        selectedFeature={selectedVoteFeature}
        onSelectFeature={(vote) => handleFeatureVote(vote as 0 | 1 | 2)}
      />
      <div className='border-2 rounded-xl overflow-hidden'>
        <iframe className='' width="1024" height="576"  src="https://www.youtube.com/embed/rVaobBdD0lw?si=TJDsQ0ASuN0pwl6g" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <FAQ faqs={faqs}/>
    </div>
  );
}
