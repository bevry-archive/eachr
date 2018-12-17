// @ts-check
/* eslint no-cond-assign:0 */
// @ts-ignore
'use strict'

// Import
const typeChecker = require('typechecker')

/**
 * The callback that is called with the details for each iteration of the subject.
 * @callback IteratorCallback
 * @param {*} this The context is bound to the subject.
 * @param {*} value The value of the iteration.
 * @param {*} key The key of the iteration.
 * @param {*} subject The collection we are iterating.
 * @returns Return `false` if you wish to break out of the iteration.
 * @example
 * ``` javascript
 * // stop iterating when we encounter break
 * eachr(['hello', 'world', 'break', 'never'], function (value, index) {
 *   return value === 'break' ? false : console.log(value)
 * })
 * // ^ logs: hello, world
 * ```
 */

/**
 * Iterate through the subject with the callback.
 * @param {Array<*> | Map<*, *> | object} subject
 * @param {IteratorCallback} callback
 * @returns {*} subject
 */
function eachr(subject, callback) {
	// Handle
	if (typeChecker.isArray(subject)) {
		for (let key = 0; key < subject.length; ++key) {
			const value = subject[key]
			if (callback.call(subject, value, key, subject) === false) {
				break
			}
		}
	} else if (typeChecker.isPlainObject(subject)) {
		for (const key in subject) {
			if (subject.hasOwnProperty(key)) {
				const value = subject[key]
				if (callback.call(subject, value, key, subject) === false) {
					break
				}
			}
		}
	} else if (typeChecker.isMap(subject)) {
		const entries = subject.entries()
		let entry
		while ((entry = entries.next().value)) {
			const [key, value] = entry // destructuring
			if (callback.call(subject, value, key, subject) === false) {
				break
			}
		}
	} else {
		// Perhaps falling back to a `for of` loop here would be sensible
		throw new Error('eachr does not know how to iterate what was passed to it')
	}

	// Return
	return subject
}

module.exports = eachr
