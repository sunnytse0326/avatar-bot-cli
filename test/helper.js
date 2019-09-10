const should = require('should')
const helper = require('../utils/helpers')

describe('#Helpers Functionalities', () => {
    it('should be a number', done => {
        helper.isNumeric(1).should.be.true
        done()
    })
    it('should not be a number', done => {
        helper.isNumeric('NUMBER').should.not.be.true
        done()
    })
})
