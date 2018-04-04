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
}
