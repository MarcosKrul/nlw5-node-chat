import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Settings from "../../entities/Settings";
import SettingsRepository from "../../repositories/SettingsRepository";

interface IParams {
    chat: boolean;
    username: string;
}

class CreateSettingsService {
    public async execute({ chat, username }: IParams): Promise<Settings> {

        const settingsRepository = getCustomRepository(SettingsRepository);

        const hasUser = await settingsRepository.findOne({
            where: { username }
        });

        if (hasUser) throw new AppError("user already exists", 409);

        const settings = settingsRepository.create({
            chat, 
            username
        });

        const save = await settingsRepository.save(settings);

        return save;
    }
}

export default CreateSettingsService;