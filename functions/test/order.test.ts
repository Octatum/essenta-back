import request from "supertest";
import app from "../src/app";

const environment = "test";

describe("Home", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});

describe("Orders", () => {
  describe("/orders", () => {
    it("should return 200 OK", () => {
      return request(app)
        .get("/orders")
        .expect(200);
    });
  });

  describe("/orders", () => {
    it("should create new order", done => {
      return request(app)
        .post("/orders")
        .send({
          environment,
          items: {
            "items": [{
                "id": "5YPO1Smo3mcMoqkMcGOK0W",
                "amount": "1",
                "colorId": "4Cjuek1kdqgGswW0iOwawc",
                "fraganceId": "52fomcNjNKAimUeOuM2QOq"
              },
              {
                "id": "69sC7kthhSEkYscyQu8WEQ",
                "amount": "2",
                "colorId": "592DUMfwiQQ64egUsOOaI4",
                "fraganceId": "52fomcNjNKAimUeOuM2QOq"
              }
            ]
          }
        })
        .expect(200)
        .then(response => {
          expect(response.body.orderId).toBeInstanceOf(String);
          expect(response.body.orderId.length).toBeGreaterThan(1);
          done();
        });
    });
  });
});
