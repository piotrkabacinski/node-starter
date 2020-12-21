// import { expect } from 'chai';
import request from 'supertest';
import createApp from '../app';

import { config as envConfig } from 'dotenv';
import { expect } from 'chai';

describe("Root", () => {
  let app: Express.Application;

  before(async () => {
    envConfig();
    app = await createApp();
  });

  it("Should return 200 response with date_time property", async () => {
    const { body } = await request(app)
      .get('/')
      .expect(200);

    expect(body).to.haveOwnProperty("foo");
  });
});
