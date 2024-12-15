import { FAQ } from '../../components/faq/faq';
import { FeatureItem } from '../../components/feature-vote/feature-vote';

export const splashNavTitle = 'CHATGPT THAT';

export const featureVoteItems: FeatureItem[] = [
  {
    featureId: 0,
    title: 'MULTIPLE SNIPS ON WEBSITE',
    description: `Allow users to take multiple snips of   
    a website in one query. All created snips (the        
    selected parts of the screen) will be sent as context 
    for the query.`
  },
  {
    featureId: 1,
    title: 'REMOVE SNIPS',
    description: `Users will no longer need to select    
    part of the screen. Instead, the chat will have full 
    context of what website the user is on and the       
    contents of that site.`
  },
  {
    featureId: 2,
    title: 'WEBSITE INTERACTION',
    description: `Allow the chat the ability to modify   
    contents of a website. An example would be to        
    permanently show a summary of an article until the   
    user reverts it.`
  },
];

export const faqs: FAQ[] = [
  {
    question: 'What is ChatGPT',
    answer: `ChatGPT is a Large Language Model (LLM) or AI 
    developed by OpenAI. It is an AI that has been trained 
    using the vast amount of information available on the  
    internet. In it's simplest form, it's a computer       
    program that is capable to understanding what you ask  
    and give a reasonable response, much like a human      
    conversation.`,
    isOpened: true,
  },
  {
    question: 'What is ChatGPT That',
    answer: `ChatGPT That is a Google Chrome extension to  
    streamline the way we use AI in the browser. Much like 
    humans, it can be tough for AI to understand what      
    someone is asking without the full context. ChatGPT    
    That allows users to select snips of the website they  
    are on as context, followed by a query for the AI. Have
    a smart AI assistant on every website you visit.`
  },
  {
    question: 'Is ChatGPT That free',
    answer: 'YES. ChatGPT That is officially FREE.'
  },
  {
    question: 'Do I need an OpenAI account',
    answer: 'Nope, the developers of ChatGPT That has you covered!'
  },
];
