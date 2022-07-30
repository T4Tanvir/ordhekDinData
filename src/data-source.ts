import "reflect-metadata"
import { DataSource } from "typeorm"
import { Biodata1,Biodata2 } from "./entity/Biodata"
import 'dotenv/config'

export const AppDataSource1 = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "postgres",
    entities: [Biodata1],
    synchronize: true,
    logging: false,
})
export const AppDataSource2 = new DataSource({
    "type": "mongodb",
    "url": process.env.DatabaseUrl,
    "useNewUrlParser": true,
    "synchronize": true,
    "logging": true,
    "entities":  [Biodata2]
})