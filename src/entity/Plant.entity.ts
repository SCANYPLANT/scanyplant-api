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
import { Maintains, User } from './';

@Entity('Plant')
@EventSubscriber()
export default class Plant extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column('text', { nullable: false })
    @Length(4, 20)
    @IsString()
    name!: string;

    @Column('text', { nullable: false })
    @IsString()
    brightness?: string;

    @Column('text', { nullable: false })
    @IsString()
    nextWatering?: string;


    @Column('text', { nullable: false })
    @IsString()
    repetition?: string;


    @Column('text', { nullable: false })
    @IsString()
    shift?: string;


    @Column('text', { nullable: false })
    @IsString()
    temperature?: string;


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
