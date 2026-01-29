import { strict as assert } from 'assert'

import { Checksum } from '../../../checksum'

describe('Checksum', function () {
	it('produces the same digest for the same updates', function () {
		const a = new Checksum().update('k1', 'v1').update('k2', 'v2').digest()
		const b = new Checksum().update('k1', 'v1').update('k2', 'v2').digest()
		assert.equal(a, b)
	})

	it('produces different digests for different order', function () {
		const a = new Checksum().update('k1', 'v1').update('k2', 'v2').digest()
		const b = new Checksum().update('k2', 'v2').update('k1', 'v1').digest()
		assert.notEqual(a, b)
	})

	it('treats undefined values as empty string', function () {
		const a = new Checksum().update('k', undefined).digest()
		const b = new Checksum().update('k', '').digest()
		assert.equal(a, b)
	})

	it('returns a non-empty base64url string', function () {
		const d = new Checksum().update('x', 'y').digest()
		assert.ok(typeof d === 'string' && d.length > 0)
		// base64url should not contain '+' '/' '='
		assert.equal(d.includes('+'), false)
		assert.equal(d.includes('/'), false)
		assert.equal(d.includes('='), false)
	})
})
