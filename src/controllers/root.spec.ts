import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
// import { SinonStub, stub } from "sinon";
import apiRequest from "../test/apiRequest";

// import redis, { RedisClient } from "redis";
// import redisMock from "redis-mock";
// import * as redisClient from "../redisClient";

describe.only("Root", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // let fakeRedis: SinonStub<any[], RedisClient>;

  // before(() => {
  //   console.log("Create fake redisClient");

  //   fakeRedis = stub(redisClient, "client").callsFake(
  //     redisMock.createClient() as any
  //   );
  // });

  after(() => {
    // fakeRedis.restore();
  });

  it.only("Should return 200 response", async () => {
    await apiRequest.get("/").expect(StatusCodes.OK);
  });

  it('Response should cointain "date_time" property', async () => {
    const { body } = await apiRequest.get("/");

    expect(body).to.haveOwnProperty("date_time");
  });
});
