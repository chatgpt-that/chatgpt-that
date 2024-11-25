import { v4 as uuid } from 'uuid';
import { S3BucketService } from '../../___integration/s3bucket/s3bucket.service.js';
import { OpenAiService } from '../../___integration/openai/openai.service.js';
import { QueryDTO } from './chat.dto.js';
import { UserService } from '../user/user.service.js';

export class ChatService {
  userService: UserService;
  openaiService: OpenAiService;
  s3BucketService: S3BucketService;

  constructor() {
    this.query=this.query.bind(this);
    this.userService = new UserService();
    this.openaiService = new OpenAiService();
    this.s3BucketService = new S3BucketService('sase-chrome-extension-001');
  }

  async query(queryDto: QueryDTO) {
    const user = await this.userService.userRepository.findOne({ email: queryDto.userEmail });
    if (!user) throw 'Cannot find associated user';
    if (user.credits <= 0) throw 'Out of credits';
    const uuidFileName = uuid() + '.png';
    const hostedImageUrl = await this.s3BucketService.saveImageToBucket(queryDto.imageDataUrl, uuidFileName);
    const queryResult = await this.openaiService.queryImage(hostedImageUrl, queryDto.queryText);
    await this.s3BucketService.removeImageFromBucket(uuidFileName);
    await this.userService.userRepository.userModel.updateOne({ email: queryDto.userEmail }, { credits: user.credits - 1 });
    return queryResult;
  }
}
