import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import apiRequest from "../test/apiRequest";

describe("Users", () => {
  const email = "foo@example.com";

  const createUserRequest = (email: string) => {
    return apiRequest.post("/users").send({ email });
  };

  it("Should create user if not exist", async () => {
    const { body } = await createUserRequest(email).expect(StatusCodes.CREATED);
    expect(body.email).to.be.equal(email);
  });

  it("Should return 303 if user already exists", async () => {
    await createUserRequest(email);
    await createUserRequest(email).expect(StatusCodes.SEE_OTHER);
  });

  it("Should return 400 if request body is not valid", async () => {
    await apiRequest
      .post("/users")
      .send({ email: 123 })
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("Should return specific user", async () => {
    const {
      body: { id },
    } = await createUserRequest(email);

    const { body } = await apiRequest
      .get(`/users/${id}`)
      .expect(StatusCodes.OK);

    expect(body.email).to.be.equal(email);
  });

  it("Should return list of users", async () => {
    const emails = [email, "bar@example.com"];

    for (const email of emails) {
      await createUserRequest(email);
    }

    const {
      body: { users },
    } = await apiRequest.get("/users").expect(StatusCodes.OK);

    expect(users.length).to.be.equal(emails.length);
    expect(users[0].email).to.be.equal(emails[0]);
    expect(users[1].email).to.be.equal(emails[1]);
  });
});
