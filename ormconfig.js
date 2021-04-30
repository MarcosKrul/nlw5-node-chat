module.exports = {
    name: 'default',
    type: process.env.TYPEORM_DEFAULT_TYPE,
    host: process.env.TYPEORM_DEFAULT_HOST,
    port: process.env.TYPEORM_DEFAULT_PORT,
    username: process.env.TYPEORM_DEFAULT_USERNAME,
    password: process.env.TYPEORM_DEFAULT_PASSWORD,
    database: process.env.TYPEORM_DEFAULT_DATABASE,

    synchronize: false,
    
    ssl: { rejectUnauthorized: false },

    entities: [
      process.env.APP_ENV === 'development'
        ? './src/entities/*.ts'
        : './dist/entities/*.js',
    ],
    
    migrations: [
      process.env.APP_ENV === 'development'
      ? './src/database/migrations/*.ts'
      : './dist/database/migrations/*.js'
    ],
    
    cli: { migrationsDir: './src/database/migrations' },
}