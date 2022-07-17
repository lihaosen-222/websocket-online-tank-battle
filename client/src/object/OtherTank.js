const GameObj = require('./GameObj')

// tank 还有独特的角度信息
class OtherTank extends GameObj {
  constructor(config) {
    config.className = 'otherTank'
    super(config)
  }
}

module.exports = OtherTank