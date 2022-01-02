import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    timezone: '+07:00',
    logging: false,
    pool: {
        max: 50,
        min: 0,
        idle: 150000,
        acquire: 200000,
    }
})

export { sequelize }