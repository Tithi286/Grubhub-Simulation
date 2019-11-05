'use strict';
var chai = require('chai'), chaiHttp = require('chai-http')
chai.use(chaiHttp);
const expect = require('chai').expect;
const app = require('../index.js');
var supertest = require("supertest");
global.request = supertest(app);


describe("Test Case", function () {
    it('Menu Test', function () {
        request.post('/menu')
            .send({
                r_id:'21'

            })
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);

            });
    })

    it('Delete Menusection Test', function () {
        request.post('/deletesection')
            .send({
                r_id:'21',
                menusection: 'Snacks'

            })
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);

            });
    })


})

