import { notFoundCode, NOT_FOUND } from './../../constants/constants';
import { checkUuid } from 'src/utils/uuid/uuid';
import { EventEntity } from './event.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddEventDto } from './dto/addEvent.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>
  ){}
  async getAll(){
    return await this.eventRepository.find();
  }
  async addEvent(eventDto: AddEventDto) {
    const allEvents = await this.eventRepository.find()
    allEvents.sort((a, b) => a.order - b.order);
    const order = allEvents.length > 0 ? allEvents[allEvents.length - 1].order + 1 : 0;
    const event = this.eventRepository.create({ ...eventDto, order });
    const response = await this.eventRepository.save(event);
    return response;
  }
  async updateBodyEvent(eventDto: AddEventDto, id: string) {
    checkUuid(id);
    const event = this.eventRepository.findOne({ where: { id }});
    if (!event) {
      throw new HttpException(NOT_FOUND, notFoundCode);
    } else {
      return await this.eventRepository.save({ ...event, ...eventDto });
    }
  }
  async removeEvent(id: string) {
    checkUuid(id);
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(NOT_FOUND, notFoundCode);
    } return 'deleted';
  }
}
