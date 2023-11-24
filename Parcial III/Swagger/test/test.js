const chai = require('chai')
const expect = require('chai').expect;
const { app } = require('../index.js')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);

describe("Pruebas al método GET de la ruta estudiante", () => {
    it("Prueba método GET a la ruta estudiante, debe usar un estatus 200", () => {
        chai.request(app)
            .get('/estudiante')
            //.send()       --Para enviar algo (por ejemplo, en un post)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    });
    it("Prueba método GET a la ruta estudiante/:id, debe usar un estatus 200", () => {
        chai.request(app)
            .get('/estudiante/?id_estudiante=1')
            //.send()       --Para enviar algo (por ejemplo, en un post)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    });
});