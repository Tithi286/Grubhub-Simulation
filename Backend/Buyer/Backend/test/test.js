'use strict';
var chai = require('chai'), chaiHttp = require('chai-http')
chai.use(chaiHttp);
const expect = require('chai').expect;
const app = require('../index.js');
var supertest = require("supertest");
global.request = supertest(app);
var user_id = '';
var phone = 4083332222;
var updatedUserName = 'Test_Admin';
var projectName = 'Test-Project' + Math.random();
var email = "test" + Math.random() + '@gmail.com';

describe("Test Case", function () {
    it('Sign Up Test', function () {
        request.post('/signup')
            .send({
                fName: "test",
                lName: "test",
                email: email,
                password: '123',
                phone: phone

            })
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);

            });
    })

    it('Log In Test', function () {
        request.post('/login')
            .send({
                email: "aloo@gmail.com",
                password: "123",
            })
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
            });
    })

    it('Search Fooditem Test', function () {
        request.post('/home')
            .send({
               food: 'pizza'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
            });
    })


})

