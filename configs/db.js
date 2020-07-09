module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: "restaurant_test",
  PORT: 3307,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}