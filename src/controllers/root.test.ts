import { describe, it } from "vitest";
import { StatusCodes } from "http-status-codes";
import apiRequest from "src/test/apiRequest.js";

describe("Root", () => {
  it("Should return 200 response", async () => {
    await apiRequest.get("/").expect(StatusCodes.OK);
  });
});
