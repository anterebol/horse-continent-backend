import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddEventDto } from './dto/addEvent.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.eventService.getAll();
  }
  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addEvent(@Body() addDto: AddEventDto) {
    return this.eventService.addEvent(addDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeEvent(@Param('id') id: string) {
    return this.eventService.removeEvent(id);
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Header('Content-Type', 'application/json')
  updateBodyEvent(@Body() eventBody: AddEventDto, @Param('id') id: string) {
    return this.eventService.updateBodyEvent(eventBody, id);
  }

}
