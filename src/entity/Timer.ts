import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Project from './Project';
import User from './User';

@Entity('timers')
class Timer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ name: 'start_time', type: 'bigint' })
  startTime: number;

  @Column({ name: 'total_time', type: 'bigint', nullable: true })
  totalTime: number;

  @Column({ name: 'is_timer_active', default: 0 })
  isActive: number;

  @ManyToOne(() => User, (user) => user.timers)
  user: User;

  @OneToOne(() => Project)
  @JoinColumn()
  project: Project;
}

export default Timer;
