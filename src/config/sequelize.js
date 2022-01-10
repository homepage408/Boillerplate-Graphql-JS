import { Sequelize } from 'sequelize'
import environmentToExport from './config'

const { databaseName, databaseUser, databasePassword, databaseHost, databasePort } = environmentToExport
const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
    host: databaseHost,
    port: databasePort,
    dialect: 'postgres',
    timezone: '+07:00',
    logging: false,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    pool: {
        max: 50,
        min: 0,
        idle: 150000,
        acquire: 200000,
    }
})


sequelize.authenticate().then(() => {
    console.log('Connected')
}).catch(err => console.error('Unable to connect ', err.message))

export { sequelize }