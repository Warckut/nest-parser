import { Videocard } from "src/domains/entities/Videocard";
import { VideocardOrmEntity } from "./entities/videocard.orm-entity";

export class VideocardMapper {
    static mapToDomain(videocardOrmEntity: VideocardOrmEntity): Videocard 
    {
        const videocard = new Videocard()
        return videocard
    }

    static mapToOrmEntity(videocard: Videocard): VideocardOrmEntity 
    {
        const videocardOrmEntity = new VideocardOrmEntity()
        videocardOrmEntity.code = videocard.code
        videocardOrmEntity.href = videocard.href
        videocardOrmEntity.memory = videocard.memory
        videocardOrmEntity.modelName = videocard.modelName
        videocardOrmEntity.price = videocard.price
        videocardOrmEntity.title = videocard.title
        return videocardOrmEntity
    }
}