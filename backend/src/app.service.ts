import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppEntity } from './app.entity';
import { UpdateTaskDto } from './UpdateTaskDto';

@Injectable()
export class AppService {
  // getHello(): { data: string } {
  //   return { data: 'Hello World!' };
  // }
  constructor(
    @InjectRepository(AppEntity)
    private taskRepository: Repository<AppEntity>,
  ) {}

  async createTask(description: string): Promise<AppEntity> {
    const task = new AppEntity();
    task.description = description;
    task.completed = false;
    return this.taskRepository.save(task);
  }

  async findAllTasks(): Promise<AppEntity[]> {
    return this.taskRepository.find();
  }

  // async updateTask(id: number, completed: boolean): Promise<AppEntity> {
  //   const task = await this.taskRepository.findOneBy({ id: id });
  //   if (!task) {
  //     return null;
  //   }
  //   task.completed = completed;
  //   return await this.taskRepository.save(task);
  // }
  // async update(task: AppEntity): Promise<AppEntity> {
  //   await this.taskRepository.update(task.id, task);
  //   return this.taskRepository.findOneOrFail({task.id: id});
  // }
  // async updateTask(id: number, completed: boolean): Promise<AppEntity> {
  //   const findOptions: FindOneOptions<AppEntity> = { where: { id } };
  //   const task = await this.taskRepository.findOne(findOptions);

  //   if (!task) {
  //     return null;
  //   }

  //   task.completed = completed;
  //   return await this.taskRepository.save(task);
  // }
  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<AppEntity> {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) {
      return null;
    }
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }
  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
  async getFilteredTasks(completed: boolean): Promise<AppEntity[]> {
    return await this.taskRepository.find({ where: { completed } });
  }
}
