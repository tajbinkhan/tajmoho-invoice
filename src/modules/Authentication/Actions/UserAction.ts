import BaseAction from "@/core/BaseAction";
import UserRepository from "@/modules/Authentication/Repositories/UserRepository";
import { User } from "@prisma/client";

export default class UserCreateAction extends BaseAction {
	private userRepository: UserRepository;

	constructor() {
		super();

		this.userRepository = new UserRepository();
	}

	async execute(data: UserCreateInterface): Promise<User> {
		try {
			const execute = await this.userRepository.create(data);

			return Promise.resolve(execute);
		} catch (e: any) {
			console.log("UserCreateAction Error: ", e.message);
			return Promise.reject(e.message);
		}
	}
}
