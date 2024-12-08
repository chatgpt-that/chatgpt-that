import { FAQ } from '../../components/faq/faq';
import { FeatureItem } from '../../components/feature-vote/feature-vote';

export const splashNavTitle = 'CHATGPT THAT';

export const featureVoteItems: FeatureItem[] = [
  {
    featureId: 0,
    title: 'MULTIPLE SNIPS ON PAGE',
    description: `Take multiple snips of a single webpage. 
    All the snips (selected parts of the webpage) will be 
    sent as content for the query.`
  },
  {
    featureId: 1,
    title: 'CROSS-SITE SNIPPING',
    description: `Take a snip from any amount of websites 
    and send all the snips combines as context for the query.`
  },
  {
    featureId: 2,
    title: 'SAVE CHAT HISTORY & SNIPPETS',
    description: `Save snippets, allowing you to bookmark the 
    pages and savechat history. This makes it into a real chat 
    like ChatGPT.`
  }
];

export const faqs: FAQ[] = [
  {
    question: 'What is ChatGPT',
    answer: `ChatGPT is a large language model (llm) or AI 
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
    answer: `ChatGPT That is a Google Chrome extension that
    allows users of Google Chrome to select any part of    
    their screen as context for ChatGPT. Much like humans, 
    it can be tough for ChatGPT to understand what someone 
    is asking without having context. ChatGPT That solves  
    this issue by showing ChatGPT exactly what the user    
    is seeing so it can return better results.`
  },
  {
    question: 'Is ChatGPT That free',
    answer: `The short answer is No. Unfortunately ChatGPT 
    charges developers to use their Api, along with this   
    ChatGPT That has a ton of planned features that will   
    require developer resources. That being said, ChatGPT  
    That will regularly give free credits and aim to bring 
    the cost down to a minimum.`
  },
  {
    question: 'How can I get ChatGPT That credits',
    answer: `It's very simple, just ask! Leave a message   
    using the feedback tool and we will happily fund the   
    account with a some credits. Keep in mind, there might 
    be certain limitations due to the demand of these      
    requests.`
  },
  {
    question: 'Do I need an OpenAI account',
    answer: `Nope, ChatGPT That uses OpenAI Api so there is
    no additional setup required for users.`
  },
];
