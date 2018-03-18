import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CatsModule } from '../../src/cats/cats.module';

describe('Cats', () => {
  const server = express();
  server.use(bodyParser.json());

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it(`/POST insert cat`, () => {
    return request(server)
      .post('/cats')
      .send({
        name: 'Tiger',
        age: 2,
        breed: 'Russian Blue',
      })
      .expect(201);
  });

});
