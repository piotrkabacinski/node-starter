import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import apiRequest from '../test/apiRequest';

describe("Root", () => {
  it("Should return 200 response", async () => {
    await apiRequest
      .get('/')
      .expect(StatusCodes.OK);
  });

  it("Response should cointain \"date_time\" property", async () => {
    const { body } = await apiRequest.get('/');

    expect(body).to.haveOwnProperty("date_time");
  });
});
