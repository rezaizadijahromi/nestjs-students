import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Questions extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  @Generated('uuid')
  code: string;

  // they added when the their entitesl compeleted
  //   @Column()
  //   lessons: string;

  //   @Column()
  //   master: string;

  @CreateDateColumn()
  initiatedDate: Date;

  @Column()
  deadLineDate: Date;

  //   @Column()
  //   associatedAnswer:
}
