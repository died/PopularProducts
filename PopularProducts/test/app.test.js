const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../dist/app')
let should = chai.should();

chai.use(chaiHttp);

describe('products', () => {
    it('Products length should be 4 with id from 1 to 4', (done) => {
        chai.request(server)
            .get('/api/products') // get product list
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                // check length and id
                res.should.have.status(200);                
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
                res.body[0].id.should.be.eql(1);
                res.body[1].id.should.be.eql(2);
                res.body[2].id.should.be.eql(3);
                res.body[3].id.should.be.eql(4);
                done();
            });
    });
    it('Vote should return a 200 response', (done) => {
        chai.request(server)
            .post('/api/vote') // vote pid:1
            .send({ id: 1 })
            .then(function (res) {
                res.should.have.status(200);
                done();
            })
            .catch(function (err) {
                throw err;
            });            
    });
});