import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import apiRequest from "../test/apiRequest";
import { createTodoRequest, createUserRequest } from "../test/utils";

describe("Users", () => {
  const email = "foo@example.com";

  describe("Create", () => {
    it("Should create user if not exist", async () => {
      const { body } = await createUserRequest(email).expect(
        StatusCodes.CREATED
      );

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
  });

  describe("Get", () => {
    it("Should return specific user", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const { body } = await apiRequest
        .get(`/users/${id}`)
        .expect(StatusCodes.OK);

      expect(body.email).to.be.equal(email);
    });

    it("Should return 404 if user does not exist", async () => {
      const id = -1;
      await apiRequest.get(`/users/${id}`).expect(StatusCodes.NOT_FOUND);
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

      for (const index in emails) {
        expect(users[index].email).to.be.equal(emails[index]);
      }
    });
  });

  describe("Delete", () => {
    it("Should delete user", async () => {
      const {
        body: { id },
      } = await createUserRequest(email).expect(StatusCodes.CREATED);

      await apiRequest.delete(`/users/${id}`).expect(StatusCodes.NO_CONTENT);

      await apiRequest.get(`/users/${id}`).expect(StatusCodes.NOT_FOUND);
    });

    it("Should delete user and his Todos", async () => {
      const {
        body: { id },
      } = await createUserRequest(email).expect(StatusCodes.CREATED);

      const {
        body: { uuid },
      } = await createTodoRequest(id, "Foo bar");

      await apiRequest.get(`/users/${id}/todos/${uuid}`).expect(StatusCodes.OK);

      await apiRequest.delete(`/users/${id}`).expect(StatusCodes.NO_CONTENT);

      await apiRequest
        .get(`/users/${id}/todos/${uuid}`)
        .expect(StatusCodes.NOT_FOUND);
    });

    it("Should return 404 if user does not exist", async () => {
      await apiRequest.delete(`/users/-1`).expect(StatusCodes.NOT_FOUND);
    });
  });
});
