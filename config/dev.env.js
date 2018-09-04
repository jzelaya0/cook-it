'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const dotenv = require('dotenv')
dotenv.config()

module.exports = merge(prodEnv, {
  HOST: JSON.stringify(process.env.HOST),
  NODE_ENV: '"development"',
  FIREBASE_APIKEY: JSON.stringify(process.env.FIREBASE_APIKEY),
  FIREBASE_AUTHDOMAIN: JSON.stringify(process.env.FIREBASE_AUTHDOMAIN),
  FIREBASE_DATABASEURL: JSON.stringify(process.env.FIREBASE_DATABASEURL),
  FIREBASE_PROJECTID: JSON.stringify(process.env.FIREBASE_PROJECTID),
  FIREBASE_STORAGEBUCKET: JSON.stringify(process.env.FIREBASE_STORAGEBUCKET),
  FIREBASE_MESSAGINGSENDERID: JSON.stringify(process.env.FIREBASE_MESSAGINGSENDERID)
})
