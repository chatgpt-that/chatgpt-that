import { CreateWaitListDTO } from './waitlist.dto.js';
import { WaitListRepository } from './waitlist.repository.js';

export class WaitListService {
  waitListRepository: WaitListRepository;

  constructor() {
    this.joinWaitList=this.joinWaitList.bind(this);
    this.waitListRepository = new WaitListRepository();
  }

  async joinWaitList(createWaitListDto: CreateWaitListDTO) {
    const existingWaitList = await this.waitListRepository.findOneByEmail({ email: createWaitListDto.email });
    if (existingWaitList) return;
    return await this.waitListRepository.createOne(createWaitListDto);
  }
}
