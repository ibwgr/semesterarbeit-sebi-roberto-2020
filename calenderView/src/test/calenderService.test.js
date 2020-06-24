
import 'regenerator-runtime/runtime'
import chai from 'chai';
import chaiHttp from "chai-http";

const {expect} = chai;
chai.use(chaiHttp);

describe('gets right Data', ()=> {

    it('get successfull userList', (done)=> {
      chai.request('http://localhost:3000').get('/names')
           .end((err,res)=>{
               expect(res).to.have.status(200);
               expect(res).to.be.an('object');
               expect(res.body).to.be.an('array');
               done()
           })
    });


    it('get successfull calendarEntries', (done)=> {
        chai.request('http://localhost:3000').get('/events')
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
                expect(res.body).to.be.an('array');
                done()
            })
    });


    it('get successfull calendarEntries for june 2020', (done) => {
        chai.request('http://localhost:3000').get('/date/6/2020')
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
                expect(res.body).to.be.an('array');
                done()
            })
    })

});

