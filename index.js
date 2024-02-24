const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb) {
        // cb(new Error("Cannot Acc")) // reject
        console.log("On connect", session.id)
        cb() // accept
    },
    onMailFrom(address, session, cb) {
        console.log("On Mail From", address.address, session.id)
        cb() // accept
    },
    onRcptTo(address, session, cb) {
        console.log("onRcptTo", address.address, session.id)
        cb() // accept
    },
    onData(stream, session, cb) {
        stream.on('data', (data) => {
            console.log("On data ", data.toString())
        })
        stream.on('end', cb)
    }
});



server.listen(25, () => {
    console.log("Server Running on PORT 25")
});
