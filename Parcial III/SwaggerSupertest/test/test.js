const request = require("supertest");
const { app } = require('../index.js');
//const expect = require('chai').expect;

describe("Testear GET a la ruta de Usuario Con CallBack", () => {
    it("Regresar Código 200", () => {
        request(app)
            .get('/estudiante')
            .end((err, res) => {
                expect(res.statusCode).toBe(200);
            })
    })
    it("Regresar Código 200 para un estudiante en específico", () => {
        request(app)
            .get("/estudiante/?id_estudiante=id")
            .end((err, res) => {
                expect(res.statusCode).toBe(200);
            })
    })
})