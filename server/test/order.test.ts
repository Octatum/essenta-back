import request from "supertest";
import app from "../src/app";

const environment = "test";

describe("Orders", () => {
  describe("/orders", () => {
    it("should return 200 OK", () => {
      return request(app)
        .get("/orders")
        .expect(200);
    });
  });
});
