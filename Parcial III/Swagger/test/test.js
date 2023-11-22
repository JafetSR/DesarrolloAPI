const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use('chaiHttp');
let app = "http://localhost:8081";

describe("Pruebas al método GET de la ruta estudiante", () => {
    it("Prueba método GET a la ruta estudiante, debe usar un estatus 200", () => {
        chai.request(app)
            .get("/estudiante")
            //.send()       --Para enviar algo (por ejemplo, en un post)
            .end((err, res) => {
                expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
            });
    });
});