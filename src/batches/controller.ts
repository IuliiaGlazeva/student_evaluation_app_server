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
//show  Batches


  @Authorized()
  @Get('/allBatches/:id([0-9]+)')
  @HttpCode(200)
  getBatch(
    @Param('id') id: number
  ) {
    return Batch.findOneById(id)
  }

  @Authorized()
  @Get('/allBatches')
  getBatches() {
    return Batch.find()
  }

// Create Batches/Students
  @Authorized()
  @Post("/addBatch")
  @HttpCode(201)
  async create(
    @Body() batch: Batch,
  ) {
    const entityBatch = await Batch.create({
        titleOfBatch: batch.titleOfBatch,
        startDate: batch.startDate,
        endDate: batch.endDate
    }).save()

    for (let i = 0; i < batch.student.length; i++) {
      const entityStudent = await Student.create({
        batch: entityBatch,
        full_name: batch.student[i].full_name,
        url: batch.student[i].url
      }).save();
      }
    }
}
