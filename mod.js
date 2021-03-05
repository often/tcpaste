export default class {
	static async create(text) {
		if (!text) throw Error('Missing text')
		if (typeof text != 'string') throw Error('Text must be a string')

		let {
			connect,
			write,
			read
		} = Deno,
		conn = await connect({
			hostname: 'tcp.st',
			port: 0x1E61
		}),
		buf = new Uint8Array(0x72)

		write(
			conn.rid,
			new TextEncoder().encode(text)
		)
		await read(conn.rid, buf)
		conn.close()

		let res = new TextDecoder().decode(buf).split('\n')

		return {
			url: res[0x00].slice(0x04),
			admin: res[0x01].slice(0x06)
		}
	}

	static async view(id) {
		if (!id) throw Error('Missing paste id')
		if (typeof id != 'string') throw Error('Paste id must be a string')

		id.includes('://tcp.st/') ? id = id.split('/')[0x03] : null

		let res = await fetch(`http://tcp.st/${id}`)

		if (res.status != 0xC8) throw Error(res.statusText)

		return res.text()
	}

	static async delete(key) {
		if (!key) throw Error('Missing admin key')
		if (typeof key != 'string') throw Error('Admin key must be a string')

		key.includes('://tcp.st/admin/') ? key = key.split('/')[0x04] : null

		let res = await fetch(`http://tcp.st/admin/${key}?action=delete`)

		if (res.status != 0x194) throw Error(res.statusText)

		return true
	}

	static async expire(key, exp) {
		if (!key) throw Error('Missing admin key')
		if (typeof key != 'string') throw Error('Admin key must be a string')

		if (!exp) throw Error('Missing expiration')
		if (typeof exp != 'string') throw Error('Expiration must be a string')

		let exps = {
			'1 hour': 0xE10,
			'2 hours': 0x1C20,
			'6 hours': 0x5460,
			'12 hours': 0xA8C0,
			'1 day': 0x15180,
			'2 days': 0x2A300,
			'5 days': 0x69780,
			'1 week': 0x93A80,
			'2 weeks': 0x127500,
			'1 month': 0x278D00,
			'1 year': 0x1E13380
		}

		if (exps[exp]) exp = exps[exp]
		else throw Error('Invalid expiration')

		key.includes('://tcp.st/admin/') ? key = key.split('/')[0x04] : null

		let res = await fetch(`http://tcp.st/admin/${key}?action=expire&expire=${exp}`)

		if (res.status != 0xC8) throw Error(res.statusText)

		return true
	}
}
