import { Videocard } from "src/domains/entities/Videocard";
import { VideocardOrmEntity } from "./entities/videocard.orm-entity";


export class AccountMapper {
	static mapToDomain(videocardOrmEntity: VideocardOrmEntity): Videocard {
		const videocard = new Videocard()
        videocard.href = videocardOrmEntity.href
        videocard.price = videocardOrmEntity.price
        videocard.shop = videocardOrmEntity.shop
        videocard.name = videocardOrmEntity.name
        videocard.srcImage = videocardOrmEntity.srcImage
        return videocard;
	}

	static mapToOrmEntity(videocard: Videocard): VideocardOrmEntity {
		const videocardOrmEntity = new VideocardOrmEntity()
        videocardOrmEntity.href = videocard.href
        videocardOrmEntity.price = videocard.price
        videocardOrmEntity.shop = videocard.shop
        videocardOrmEntity.name = videocard.name
        videocardOrmEntity.srcImage = videocard.srcImage
        return videocardOrmEntity;
	}
}