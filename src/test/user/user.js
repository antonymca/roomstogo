'use strict'

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
   
/*
  * Test the /GET route
  */
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/v1.0/user')
            .end((err, res) => {
                console.log(res.body);
                  res.should.have.status(200);                  
              done();
            });
      });
  });

});