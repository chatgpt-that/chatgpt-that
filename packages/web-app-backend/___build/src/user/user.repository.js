import { v4 as uuid } from 'uuid';
import { userModel } from './user.schema.js';
export class UserRepository {
    userModel;
    initialCredits;
    constructor() {
        this.findOne = this.findOne.bind(this);
        this.createOne = this.createOne.bind(this);
        this.userModel = userModel;
        this.initialCredits = 2;
    }
    async findOne(findUserDto) {
        return await this.userModel.findOne({ email: findUserDto.email });
    }
    async createOne(createUserDto) {
        const created_at = new Date().toISOString();
        const id = uuid();
        const user = new this.userModel({
            id,
            email: createUserDto.email,
            credits: this.initialCredits,
            created_at
        });
        await user.save();
        const constructedUser = {
            id,
            email: createUserDto.email,
            credits: this.initialCredits,
            created_at
        };
        return constructedUser;
    }
}
