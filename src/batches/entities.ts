import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
import { IsString, IsBoolean, IsDate } from 'class-validator'



@Entity()
export class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  titleOfBatch: string
  @IsString()

  @Column('date')
  startDate: Date


  @IsString()
  @Column('date')
  endDate: Date


  @OneToMany(_ => Student, student => student.batch, {eager:true})
  student: Student[]

  //@Column('integer', {default: 0})
  //level: number

  ////@Column('integer', {default: 0})
//  winner: number

  //@Column('text', {default: 'pending'})
  //status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  //@OneToMany(_ => Player, player => player.game, {eager:true})
  //players: Player[]
}

@Entity()
//@Index(['game', 'user', 'symbol'], {unique:true})
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => Batch, batch => batch.student)
  batch: Batch


  //@ManyToOne(_ => Game, game => game.players)
  //game: Game


  @Column('text', {nullable:false})
  full_name: string

  @Column('text')
  url: string
}
