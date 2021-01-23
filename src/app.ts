import express from 'express'
import { Server } from 'http';
import { AddressInfo } from 'net';

const app = express()

export const myFunction = (a: number, b: number) => (a + b)

const server: Server = app.listen(process.env.PORT || 8000, () => {
    const serverAddress = server.address()
    if (typeof serverAddress !== 'string' && serverAddress !== null) {
        console.log("Server running at port: " + serverAddress?.port)
    }
});