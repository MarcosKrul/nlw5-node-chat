import { EntityRepository, Repository } from "typeorm";
import Connections from "../entities/Connections";


@EntityRepository(Connections)
class ConnectionsRepository extends Repository<Connections> {}

export default ConnectionsRepository;