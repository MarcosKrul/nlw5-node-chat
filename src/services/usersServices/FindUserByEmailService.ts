import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Users from "../../entities/Users";
import UsersRepository from "../../repositories/UsersRepository";

interface IParams {
    email: string;
}

class FindUserByEmailService {
    public async execute({ email }: IParams): Promise<Users | undefined> {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({
            where: { email }
        });

        return user;
    }
}

export default FindUserByEmailService;