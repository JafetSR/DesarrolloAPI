const modulo = require('../src/modulo.js');
let expect = require('chai').expect;


describe("Pruebas para comprobar si es un número Par entre 1 al 30", () => {
    it(" :Es mayor a cero", () => {
        let numero = 5
        let result = modulo.EsPar(numero);
        //expect(numero).to.be.a('number');
        expect(numero).to.above(0);
        //expect(result).to.be.a('boolean');
    }),
    it(" :Es menor a 31", () => {
        let numero = 5
        let result = modulo.EsPar(numero);
        expect(numero).to.below(31);
        //expect(result).to.be.a('boolean');
    })
})