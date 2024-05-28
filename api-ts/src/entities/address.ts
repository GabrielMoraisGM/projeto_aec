import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type:"varchar", length: 9 })
  zipCode: string;

  @Column({nullable: false})
  street: string;

  @Column({nullable: false})
  number: number

  @Column({ nullable: true, type:"varchar"})
  complement: string;

  @Column({nullable: false})
  neighborhood: string;

  @Column({nullable: false})
  city: string;

  @Column({ nullable: false, type:"varchar", length: 2 })
  state: string;
}

export default Address;