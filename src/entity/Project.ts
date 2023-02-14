import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import User from './User';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}

export default Project;
