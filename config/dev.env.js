'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CTP_PROJECT_KEY: `'${process.env.CTP_PROJECT_KEY}'`,
  CTP_CLIENT_ID: `'${process.env.CTP_CLIENT_ID}'`,
  CTP_CLIENT_SECRET: `'${process.env.CTP_CLIENT_SECRET}'`
})
