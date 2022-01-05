import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity, ItemTypeEntity } from '../entity';
import { ModelRepository } from '../../model.repository';
import { ItemDto, ItemDtoUpdate, ItemTypeDto } from '../dto';
import { PlayerDto } from '../../player';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: ModelRepository<ItemEntity>,
    @InjectRepository(ItemTypeEntity)
    private itemTypeRepository: ModelRepository<ItemTypeEntity>,
  ) {}

  createType(itemType: ItemTypeDto): Promise<ItemTypeEntity> {
    return this.itemTypeRepository.createEntity(itemType);
  }

  findAllTypes(): Promise<ItemTypeEntity[]> {
    return this.itemTypeRepository.find();
  }

  updateItemQuality(item: ItemDtoUpdate): Promise<ItemDto> {
    return this.itemRepository.updateEntity(item.id, item);
  }

  deleteType(itemType: ItemTypeDto): Promise<ItemTypeDto> {
    return this.itemTypeRepository.remove(itemType);
  }

  createItem(item: ItemDto): Promise<ItemDto> {
    return this.itemRepository.createEntity(item);
  }

  findAllItem(): Promise<ItemDto[]> {
    return this.itemRepository.find();
  }

  findAllItemByPerson(owner: PlayerDto): Promise<ItemDto[]> {
    return this.itemRepository.find(owner);
  }

  deleteItem(item: ItemEntity): Promise<ItemDto> {
    return this.itemRepository.remove(item);
  }
}
