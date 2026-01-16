import request from "supertest";
import createApp from "src/app.js";

const app = createApp();

export default request(app);
