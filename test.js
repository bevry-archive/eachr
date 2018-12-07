'use strict'

/** @type {typeof import("./source/test") } */
module.exports = require('editions').requirePackage(
	__dirname,
	require,
	'test.js'
)
