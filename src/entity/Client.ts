import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import User from './User';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.clients)
  user: User;
}

export default Client;
