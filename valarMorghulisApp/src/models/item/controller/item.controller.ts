import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from '../service';
import { ItemDto, ItemTypeDto } from '../dto';
import { PlayerDto } from '../../player';
import { ItemEntity } from '../entity';
import { Role } from '../../../enums';
import JwtAuthenticationGuard from '../../../common/guard/jwtAuthentication.guard';
import { RoleGuard } from '../../../common';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post('/type')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthenticationGuard)
  async createItemType(@Body() itemType: ItemTypeDto): Promise<ItemTypeDto> {
    return await this.itemService.createType(itemType);
  }

  @Post('/')
  @UseGuards(JwtAuthenticationGuard)
  async createItem(@Body() item: ItemDto): Promise<ItemDto> {
    return await this.itemService.createItem(item);
  }

  @Get('/type')
  @UseGuards(JwtAuthenticationGuard)
  async findAllTypes(): Promise<ItemTypeDto[]> {
    return await this.itemService.findAllTypes();
  }

  @Get('/')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthenticationGuard)
  async findAllItem(): Promise<ItemDto[]> {
    return await this.itemService.findAllItem();
  }

  @Get('/')
  @UseGuards(JwtAuthenticationGuard)
  findAllItemByPerson(owner: PlayerDto): Promise<ItemDto[]> {
    return this.itemService.findAllItemByPerson(owner);
  }

  @Patch('/')
  @UseGuards(JwtAuthenticationGuard)
  async updateItemQuality(@Body() item: ItemDto): Promise<ItemDto> {
    return await this.itemService.updateItemQuality(item);
  }

  @Delete('/type')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(JwtAuthenticationGuard)
  async deleteType(itemType: ItemTypeDto): Promise<ItemTypeDto> {
    return await this.itemService.deleteType(itemType);
  }

  @Delete('/')
  @UseGuards(JwtAuthenticationGuard)
  async deleteItem(item: ItemEntity): Promise<ItemDto> {
    return await this.itemService.deleteItem(item);
  }
}
