import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID } from "typeorm"

@Entity()
export class Biodata1 {
  
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn ()
    @Column({
        type: "varchar",
        length: 10,
        unique: true,
    })
    bioDataNumber: string

    @Column()
    birthYear: string

    @Column()
    proffesion: string

    @Column()
    maritalStatus: string

    @Column()
    bioDataLink: string
}

@Entity()
export class Biodata2 {
  
    @ObjectIdColumn()
    id: ObjectID

    @ObjectIdColumn()
    @Column({
        type: "varchar",
        length: 10,
        unique: true,
    })
    bioDataNumber: string

    @Column()
    birthYear: string

    @Column()
    proffesion: string

    @Column()
    maritalStatus: string

    @Column()
    bioDataLink: string
}
