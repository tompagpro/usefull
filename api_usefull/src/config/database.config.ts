export default () => ({
  port: +process.env.DB_PORT || 5432,
  dbHost: process.env.DB_HOST,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
});
