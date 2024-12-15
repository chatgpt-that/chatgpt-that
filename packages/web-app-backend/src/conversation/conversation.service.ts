import { v4 as uuid } from 'uuid';
import { UserService } from '../user/user.service.js';
import { ConversationRepository } from './conversation.repository.js';
import { AddToConversationDTO, DeleteConversationDTO, GetConversationDTO } from './conversation.dto.js';
import { S3BucketService } from '../../___integration/s3bucket/s3bucket.service.js';
import { IConversationMessage } from './conversation.schema.js';
import { LlamaService } from '../../___integration/llama/llama.service.js';

export class ConversationService {
  llamaService: LlamaService;
  userService: UserService;
  s3BucketService: S3BucketService;
  conversationRepository: ConversationRepository;

  constructor() {
    this.getConversation=this.getConversation.bind(this);
    this.addToConversation=this.addToConversation.bind(this);
    this.deleteConversation=this.deleteConversation.bind(this);
    this.userService = new UserService();
    this.llamaService = new LlamaService();
    this.conversationRepository = new ConversationRepository();
    this.s3BucketService = new S3BucketService('sase-chrome-extension-001');
  }

  async getConversation(getConversationDto: Readonly<GetConversationDTO>) {
    return await this.conversationRepository.findOne({ 
      user_email: getConversationDto.userEmail,
      website_url: getConversationDto.websiteUrl,
    });
  }

  async addToConversation(addToConversationDto: Readonly<AddToConversationDTO>) {
    const user = await this.userService.userRepository.findOne({ email: addToConversationDto.userEmail });
    if (!user) throw 'Cannot find associated user';
    if (user.credits <= 0) throw 'Out of credits';

    let hostedSnippetUrl = undefined;
    const snippetId = `${uuid()}.png`;
    if (addToConversationDto.imageDataUrl) {
      hostedSnippetUrl = await this.s3BucketService.saveImageToBucket(addToConversationDto.imageDataUrl, snippetId);
    }

    const userMessage: IConversationMessage = {
      identity: 'user',
      message: addToConversationDto.query,
      snippet: hostedSnippetUrl,
    };

    const existingConversation = await this.getConversation({ 
      userEmail: addToConversationDto.userEmail,
      websiteUrl: addToConversationDto.websiteUrl,
    });

    const updatedConversationWithUserMessage = 
      existingConversation ? [...existingConversation.conversation, userMessage] : [userMessage];
    const llamaResponseText = await this.llamaService.continueConversation({ conversation: updatedConversationWithUserMessage});
    updatedConversationWithUserMessage.push({ identity: 'assistant', message: llamaResponseText });

    if (existingConversation) {
      await this.conversationRepository.updateOneById({
        id: existingConversation.id,
        updates: { conversation: updatedConversationWithUserMessage }
      });
    } else {
      await this.conversationRepository.createOne({
        userEmail: addToConversationDto.userEmail,
        websiteUrl: addToConversationDto.websiteUrl,
        initialConversation: updatedConversationWithUserMessage
      });
    }

    await this.userService.userRepository.userModel.updateOne({ email: user.email }, { credits: user.credits - 1 });
    return updatedConversationWithUserMessage;
  }

  async deleteConversation(deleteConversationDto: Readonly<DeleteConversationDTO>) {
    return await this.conversationRepository.deleteOneById(deleteConversationDto);
  }

}
