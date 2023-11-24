const request = require("supertest");
const { app } = require("..");
//const { app } = require('../index.js');
const expect = require('chai').expect;

describe("Testear GET a la ruta de Usuario Con CallBack", () => {
    it("Regresar Código 200", () => {
        request(app)
        .get('/estudiante')
        .end((err, res) => {
            expect(res).to.equal(200);
        })
    })
})