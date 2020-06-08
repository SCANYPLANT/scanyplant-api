import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    EventSubscriber,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber } from 'class-validator';
import { Plant } from './index';

@Entity('Maintains')
@EventSubscriber()
export default class Maintains extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column('integer', { nullable: true })
    @IsNumber()
    wateringPeriod!: number;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @IsDate()
    updatedAt!: Date;

    @ManyToMany(
        () => Plant,
        plant => plant.uuid,
        {
            cascade: true,
            eager: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    )
    plants!: Plant[];
}
