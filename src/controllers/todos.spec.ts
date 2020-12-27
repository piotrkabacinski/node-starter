import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import apiRequest from "../test/apiRequest";
import { createUserRequest, createTodoRequest } from "../test/utils";

describe("Todos", () => {
  const email = "foo@example.com";
  const description = "Hello, World!";
  const nonExistingUuid = "00000000-0000-0000-0000-000000000000";

  describe("Create", async () => {
    it("Should create new Todo", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      await createTodoRequest(id, description).expect(StatusCodes.CREATED);
    });
  });

  describe("Get", async () => {
    it("Should get users todo", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const descriptions = ["Foo", "Bar", "Baz"];

      for (const description of descriptions) {
        await createTodoRequest(id, description);
      }

      const {
        body: { todos },
      } = await apiRequest.get(`/users/${id}/todos`).expect(StatusCodes.OK);

      expect(todos.length).to.be.equal(descriptions.length);

      for (const index in descriptions) {
        expect(todos[index].description).to.be.equal(descriptions[index]);
      }
    });

    it("Should get specific todo", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const {
        body: { uuid },
      } = await createTodoRequest(id, description);

      const { body } = await apiRequest
        .get(`/users/${id}/todos/${uuid}`)
        .expect(StatusCodes.OK);

      expect(body.description).to.be.equal(description);
    });

    it("Should response with 404 when specific user's todo was not found", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      await apiRequest
        .get(`/users/${id}/todos/${nonExistingUuid}`)
        .expect(StatusCodes.NOT_FOUND);
    });
  });

  describe("Delete", async () => {
    it("Should delete todo", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const {
        body: { uuid },
      } = await createTodoRequest(id, description);

      await apiRequest
        .delete(`/users/${id}/todos/${uuid}`)
        .expect(StatusCodes.NO_CONTENT);
    });

    it("Should return 404 if user or todo does not exist", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const {
        body: { uuid },
      } = await createTodoRequest(id, description);

      await apiRequest
        .delete(`/users/-1/todos/${uuid}`)
        .expect(StatusCodes.NOT_FOUND);

      await apiRequest
        .delete(`/users/${id}/todos/${nonExistingUuid}`)
        .expect(StatusCodes.NOT_FOUND);
    });
  });

  describe("Update", async () => {
    const requestBody = {
      description: "Updated desc.",
      is_done: true,
    };

    it("Should update Todo item", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const {
        body: { uuid },
      } = await createTodoRequest(id, description);

      const { body } = await apiRequest
        .patch(`/users/${id}/todos/${uuid}`)
        .send(requestBody)
        .expect(StatusCodes.OK);

      expect(body.description).to.be.equal(requestBody.description);
      expect(body.is_done).to.be.equal(requestBody.is_done);
      expect(body).to.haveOwnProperty("updated_at");
    });

    it("Should return 404 if user or todo does not exist", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const {
        body: { uuid },
      } = await createTodoRequest(id, description);

      await apiRequest
        .patch(`/users/-1/todos/${uuid}`)
        .send(requestBody)
        .expect(StatusCodes.NOT_FOUND);

      await apiRequest
        .patch(`/users/${id}/todos/${nonExistingUuid}`)
        .send(requestBody)
        .expect(StatusCodes.NOT_FOUND);
    });

    it("Should return 400 if request body is not valid", async () => {
      const {
        body: { id },
      } = await createUserRequest(email);

      const {
        body: { uuid },
      } = await createTodoRequest(id, description);

      await apiRequest
        .patch(`/users/${id}/todos/${uuid}`)
        .send({
          is_done: 123,
        })
        .expect(StatusCodes.BAD_REQUEST);

      await apiRequest
        .patch(`/users/${id}/todos/${uuid}`)
        .send({
          description: true,
        })
        .expect(StatusCodes.BAD_REQUEST);
    });
  });
});
