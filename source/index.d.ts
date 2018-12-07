/** Internal type to make overloading easier */
type SubjectType<Key extends keyof any, Value> =
	| Map<Key, Value>
	| Array<Value>
	| Record<Key, Value>

/**
 * The callback that is called with the details for each iteration of the subject.
 * @param this The context is bound to the subject.
 * @param value The value of the iteration.
 * @param key The key of the iteration.
 * @param subject The collection we are iterating.
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
export interface IteratorCallback<
	Subject extends SubjectType<Key, Value>,
	Key extends keyof any,
	Value
> {
	(this: Subject, value: Value, key: Key, subject: Subject): void | false
}

/**
 * Iterate through an Array, receiving the value and index.
 * @example
 * ``` javascript
 * const arr = [1, 2 'three']
 * eachr(arr, (value, key) => {})
 * ```
 */
export default function eachr<Subject extends Array<Value>, Value>(
	subject: Subject,
	callback: IteratorCallback<Subject, number, Value>
): typeof subject

/**
 * Iterate through an object, receiving the value and key.
 * @example
 * ``` javascript
 * const obj = { a: 1, b: 'two' }
 * eachr(obj, (value, key) => {})
 * ```
 */
export default function eachr<
	Subject extends Record<Key, Value>,
	Key extends keyof Subject,
	Value extends Subject[Key]
>(subject: Subject, callback: IteratorCallback<Subject, Key, Value>): Object

/**
 * Iterate through a Map, receiving the value and key.
 * @example
 * ``` javascript
 * const map = new Map<string, number | string>().set('a', 1).set('b', 'two')
 * eachr(map, (value, key) => {})
 * ```
 */
export default function eachr<
	Subject extends Map<Key, Value>,
	Key extends keyof any,
	Value
>(
	subject: Subject,
	callback: IteratorCallback<Subject, Key, Value>
): typeof subject

/** Iterate through the subject. */
export default function eachr<
	Subject extends SubjectType<Key, Value>,
	Key extends keyof any,
	Value
>(
	subject: Subject,
	callback: IteratorCallback<Subject, Key, Value>
): typeof subject
