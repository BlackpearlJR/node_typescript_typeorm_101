import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import {
  IsDate,
  IsNotEmpty,
  IsEmail,
  validateOrReject,
  MinLength,
  MaxLength
} from "class-validator";
import { UniqueOnDatabase } from "@/application/Validators/UniqueValidation";
import Status from "@/interfaces/enums/Status";

@Entity('users')
@Unique(['id', 'email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 150, unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty()
  @UniqueOnDatabase(User)
  email: string;


  @Column({ nullable: false, length: 30, unique: true })
  @IsNotEmpty()
  @UniqueOnDatabase(User)
  username: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @Column({
    nullable: false,
    length: 100
  })
  @IsNotEmpty()
  firstname: string;

  @Column({ nullable: false, length: 100 })
  @IsNotEmpty()
  lastname: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.active
  })
  status: Status;

  @Column({ nullable: true, length: 100, unique: true })
  @UniqueOnDatabase(User)
  remember_token: string;

  @CreateDateColumn({
    type: "timestamp",
    name: 'created_at',
    nullable: false,
    default: () => new Date()
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: 'updated_at',
    onUpdate: 'NOW()',
    nullable: true
  })
  updated_at: Date;


  // @BeforeInsert()
  // @BeforeUpdate()
  // async validate() {
  //   await validateOrReject(this);
  // }

  // constructor(user: Partial<User>) {
  //   Object.assign(this, user);
  // }
}
