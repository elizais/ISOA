import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ItemService } from '../service';
import { ItemDto, ItemTypeDto } from '../dto';
import { PlayerDto } from '../../player';
import { ItemEntity } from '../entity';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post('/type')
  async createItemType(@Body() itemType: ItemTypeDto): Promise<ItemTypeDto> {
    return await this.itemService.createType(itemType);
  }

  @Post('/')
  async createItem(@Body() item: ItemDto): Promise<ItemDto> {
    return await this.itemService.createItem(item);
  }

  @Get('/type')
  async findAllTypes(): Promise<ItemTypeDto[]> {
    return await this.itemService.findAllTypes();
  }

  @Get('/')
  async findAllItem(): Promise<ItemDto[]> {
    return await this.itemService.findAllItem();
  }

  @Get('/')
  findAllItemByPerson(owner: PlayerDto): Promise<ItemDto[]> {
    return this.itemService.findAllItemByPerson(owner);
  }

  @Patch('/')
  async updateItemQuality(@Body() item: ItemDto): Promise<ItemDto> {
    return await this.itemService.updateItemQuality(item);
  }

  @Delete('/type')
  async deleteType(itemType: ItemTypeDto): Promise<ItemTypeDto> {
    return await this.itemService.deleteType(itemType);
  }

  @Delete('/')
  async deleteItem(item: ItemEntity): Promise<ItemDto> {
    return await this.itemService.deleteItem(item);
  }
}
