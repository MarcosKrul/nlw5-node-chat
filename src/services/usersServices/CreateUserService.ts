import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Users from "../../entities/Users";
import UsersRepository from "../../repositories/UsersRepository";

interface IParams {
    email: string;
}

class CreateUserService {
    public async execute({ email }: IParams): Promise<Users> {

        const usersRepository = getCustomRepository(UsersRepository);

        const hasUser = await usersRepository.findOne({
            where: { email }
        });

        if (hasUser) throw new AppError("user already exists", 409);

        const user = usersRepository.create({ email });

        const save = await usersRepository.save(user);

        return save;
    }
}

export default CreateUserService;