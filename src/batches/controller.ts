import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch
} from 'routing-controllers'
//import User from '../users/entity'
import { Batch, Student} from './entities'
//import {calculateWinner} from './logic'
import { Validate, IsInt } from 'class-validator'


@JsonController()
export default class BatchController {
//show  Batches/students
  @Get('/allBatches')
  async getBatches() {
    return Batch.find()
  }


  @Authorized()
  @Get('/allBatches/:id([0-9]+)')
  @HttpCode(200)
  async getBatch(
    @Param('id') id: number
  ) {
    return Batch.findOneById(id)
  }

  //@Authorized()


  @Authorized()
  @Get('/allBatches/:id([0-9]+)/allStudents')
  @HttpCode(200)
  async getStudentsInBatch(
    @Param('id') batch_id : number
  ) {
      return Batch.findOneById(batch_id)
    }


// Create Batches/Students
  @Authorized()
  @Post("/allBatches")
  @HttpCode(201)
  async create(
    @Body() batch: Batch,
  ) {
  return batch.save()
}
}
