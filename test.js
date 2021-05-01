import tcpaste from 'https://deno.land/x/tcpaste@v1.0.0/mod.js'
let { log } = console

log(await tcpaste.create('hi')) // { url: 'http://tcp.st/...', admin: 'http://tcp.st/admin/...' }
log(await tcpaste.view('w6696')) // hi
log(await tcpaste.view('http://tcp.st/n_xl4')) // hi
log(await tcpaste.delete('1c247970c3e9cce0b8f165c4556be80f423cbac7eb0a7fa27a4ef02458f31f25')) // true
log(await tcpaste.delete('http://tcp.st/admin/bab589a3eafffc1a85f71155e7fe472f1d4a6ed49d389421928a3df15ef96187')) // true
log(await tcpaste.expire('72ef977be182824a48c30c9cc185b0122f1b7965af721bc5388352f1376e880a', '1 month')) // true
log(await tcpaste.expire('http://tcp.st/admin/72ef977be182824a48c30c9cc185b0122f1b7965af721bc5388352f1376e880a', '1 year')) // true
