import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    EventSubscriber,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsDecimal, IsString, Length } from 'class-validator';
import { User } from './User.entity';
import { Maintains } from './Maintains.entity';

@Entity('Plant')
@EventSubscriber()
export class Plant extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column('text', { nullable: false })
    @Length(4, 20)
    @IsString()
    name!: string;

    @Column('decimal')
    @IsDecimal()
    size!: number;

    @Column('date')
    purchase!: Date;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @IsDate()
    updatedAt!: Date;

    @ManyToOne(
        () => User,
        user => user.uuid,
        {
            cascade: true,
            eager: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinTable()
    user!: User;

    @OneToMany(
        () => Maintains,
        maintains => maintains.uuid,
        {
            cascade: true,
            eager: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    maintains!: Maintains[];
}
