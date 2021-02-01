import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('elites_bible_db', 'root', '', {
  host: 'localhost',
  dialect: "mysql"
})

export default sequelize