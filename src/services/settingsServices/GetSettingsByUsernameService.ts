import { getCustomRepository } from "typeorm";
import Settings from "../../entities/Settings";
import SettingsRepository from "../../repositories/SettingsRepository";

interface IParams {
    username: string;
}

class GetSettingsByUsernameService {
    public async execute({ username }: IParams): Promise<Settings | undefined> {

        const settingsRepository = getCustomRepository(SettingsRepository);

        const settings = await settingsRepository.findOne({
            where: { username }
        });

        return settings;
    }
}

export default GetSettingsByUsernameService;