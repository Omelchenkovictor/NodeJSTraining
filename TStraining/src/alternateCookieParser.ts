import { Request, Response } from "express"

const alternateCookieParser = async (req: Request, _: Response, next: Function) => {
    await console.log(req.rawHeaders)
    console.log(req.rawHeaders.indexOf('Cookie'))
    let reader = req.rawHeaders[req.rawHeaders.indexOf('Cookie') + 1].split('; ')
    let map: any = {}
    reader.forEach((element: String) => {
        let data = element.split('=');
        map[data[0]] = data[1];
    })
    req.cookies = map
    next()
}

export { alternateCookieParser }