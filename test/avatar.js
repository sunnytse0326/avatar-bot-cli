const should = require('should')
const Avator = require('../model/avatar')
const helper = require('../utils/helpers')

describe('#Avator Functionalities', () => {
  it('should successfully create an avatar with an constructor of correct input', done => {
    var avatar = new Avator(0, 0,'E')
    avatar.x.should.equal(0)
    done()
  })
  it('should return NaN when avatar is created with an constructor of empty input', done => {
    var avatar = new Avator()
    isNaN(avatar).should.be.true
    done()
  })
  it('should return left successfully', done => {
    var avatar = new Avator(0, 0,'E')
    avatar.left()
    avatar.direction.should.equal('N')
    done()
  })
  it('should return right successfully', done => {
    var avatar = new Avator(0, 0,'S')
    avatar.right()
    avatar.direction.should.equal('W')
    done()
  })
  it('should move avatar forward', done => {
    var avatar = new Avator(0, 0,'N')
    avatar.move()
    avatar.y.should.equal(1)
    done()
  })
  it('should get Json data sucessfully', done => {
    var avatar = new Avator(0, 0,'N')
    avatar.getJson().X.should.equal(0)
    avatar.getJson().Y.should.equal(0)
    avatar.getJson().F.should.equal('N')
    done()
  })
  it('should sucessfully save avatar\'s data', done => {
    var avatar = new Avator(0, 0,'N')

    const mockDataPath = 'mockData'
    helper.createEmptyFile(mockDataPath)
    avatar.save(mockDataPath)
    helper.readFileExist(mockDataPath).should.be.true
    helper.deleteFile(mockDataPath)
    helper.readFileExist(mockDataPath).should.not.be.true
    done()
  })
})
