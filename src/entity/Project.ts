import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Timer from './Timer';
import User from './User';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '#ffffff' })
  color: string;

  @Column({ default: 0 })
  salary: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Timer, (timer) => timer.project)
  timers: Timer[];
}

export default Project;
