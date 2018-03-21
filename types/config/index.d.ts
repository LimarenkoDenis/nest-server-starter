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
  }
}
