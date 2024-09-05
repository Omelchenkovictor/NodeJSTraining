import { randomUUID } from "node:crypto";

async function sessionId(_: any, res: any, next: Function) {
    /* try {
        if (req.cookies.sessionId && req.cookies.user && req.cookies.role && req.cookies.date)
        //res.write('done');
        { next() }
    } catch (error) {
        res.cookie('sessionId', randomUUID());
        next()
    } */
    await res.cookie('sessionId', randomUUID());
    next()

}

export { sessionId };