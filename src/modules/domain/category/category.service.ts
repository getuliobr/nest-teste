import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { string } from 'joi';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly categoryReposity: Repository<Category>;

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryReposity.create(createCategoryDto);
    return await this.categoryReposity.save(category);
  }

  async findAll() {
    return await this.categoryReposity.find();
  }

  async findOne(id: string) {
    return await this.categoryReposity.findOneBy({ id });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    category.name = updateCategoryDto.name;
    return await this.categoryReposity.save(category);
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await this.categoryReposity.softRemove(category);
    return category;
  }
}
