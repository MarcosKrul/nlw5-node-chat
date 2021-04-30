import { EntityRepository, Repository } from "typeorm";
import Users from "../entities/Users";


@EntityRepository(Users)
class UsersRepository extends Repository<Users> {}

export default UsersRepository;