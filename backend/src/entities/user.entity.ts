import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Transaction } from './transaction.entity';
import { Budget } from './budget.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  line_user_id: string;

  @Column()
  display_name: string;

  @Column({ nullable: true })
  line_picture_url: string;

  @Column({ default: 'free' })
  role: string;

  @Column({ default: 'THB' })
  default_currency: string;

  @Column({ default: 'Asia/Bangkok' })
  timezone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Category, category => category.user)
  categories: Category[];

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Budget, budget => budget.user)
  budgets: Budget[];
}
