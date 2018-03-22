type Config = {
  appConfig: {
    port: number
  },
  dbConfig: {
    host: string
  },
  dbConfigTest: {
    host: string
  },
  expireTime: {
    time: number
  },
  jwtConf: {
    secret: string
  },
  mysqlConifg: {
    dialect: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string
  }
}
