#!/usr/bin/env node

require('babel/register');
// var device = require('./device');
var device = require('../lib/device.js');
var deviceTypes = require('../lib/data.js');

var type = deviceTypes["RotaryPot"];

var pot = device.createDevice("SAM", type);
pot.connect()

console.log(pot)
