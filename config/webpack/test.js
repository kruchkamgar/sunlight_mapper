process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

module.exports = environment.toWebpackConfig()

// skips annoying jest test suite error message
test.skip('skip', () => {})
