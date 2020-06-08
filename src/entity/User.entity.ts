import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    EventSubscriber,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsEmail, IsString, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import Plant from './Plant.entity';

@Entity('User')
@EventSubscriber()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column('text', { nullable: true })
    @Length(4, 20)
    @IsString()
    firstName!: string;

    @Column('text', { nullable: true })
    @Length(4, 20)
    @IsString()
    lastName!: string;

    @Column('text', { nullable: true, unique: true })
    @IsEmail()
    email!: string;

    @Column('text', { select: false })
    @Length(4, 100)
    @IsString()
    password!: string;

    @CreateDateColumn({ type: 'timestamp' })
    @IsDate()
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @IsDate()
    updatedAt!: Date;

    // parce que plusieurs utilisateurs peuvent se connecter sur un bucket
    @OneToMany(
        () => Plant,
        plant => plant.user,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    plants!: Plant[];

    @BeforeInsert()
    hashPassword(salt = 5): string {
        return bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}
