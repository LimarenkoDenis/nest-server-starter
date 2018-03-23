type Config = {
  appConfig: {
    port: number
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
