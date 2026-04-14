import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { afterEach, beforeEach, describe, it } from 'node:test';

void describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  void it('/ (GET)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
