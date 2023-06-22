import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppEntity } from './app.entity';
import { UpdateTaskDto } from './UpdateTaskDto';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): { data: string } {
  //   return this.appService.getHello();
  // }
  @Post()
  async create(@Query('description') description: string): Promise<AppEntity> {
    return this.appService.createTask(description);
  }
  @Get()
  async findAll(): Promise<AppEntity[]> {
    return this.appService.findAllTasks();
  }
  // @Put(':id')
  // async updateTask(
  //   @Param('id') id: number,
  //   @Query('completed') completed: boolean,
  // ): Promise<AppEntity> {
  //   return await this.appService.updateTask(+id, completed);
  // }
  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<AppEntity> {
    const task = await this.appService.updateTask(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  @Get('filter')
  async getFilteredTasks(
    @Query('completed') completed: boolean,
  ): Promise<AppEntity[]> {
    return await this.appService.getFilteredTasks(completed);
  }
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    await this.appService.deleteTask(+id);
  }
}
