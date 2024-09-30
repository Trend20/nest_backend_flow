import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import moment from 'moment-timezone';
@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  // @Column({
  //   type: Date,
  //   default: moment(new Date()).format('YYYY-MM-DD HH:ss'),
  // })
  // createdAt;
  //
  // @Column({
  //   type: Date,
  //   default: moment(new Date()).format('YYYY-MM-DD HH:ss'),
  //   nullable: true,
  // })
  // updatedAt;
  // Automatically set the timestamp when the row is created
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // Automatically update the timestamp when the row is updated
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  // Use this hook if you need custom logic on update
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
