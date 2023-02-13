import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Client from './Client';
import Project from './Project';
import Timer from './Timer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  name: string;

  @Column({ name: 'github_id' })
  githubId: number;

  @Column({ name: 'github_name', default: '' })
  githubName: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Timer, (timer) => timer.user)
  timers: Timer[];

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];
}

export default User;
