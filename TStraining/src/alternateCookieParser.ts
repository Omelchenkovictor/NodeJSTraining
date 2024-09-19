import { Request, Response } from "express"

const alternateCookieParser = async (req: Request, _: Response, next: Function) => {
    req.cookies = alternateCookieParser2(req.rawHeaders[req.rawHeaders.indexOf('Cookie') + 1])
    next()
}

const alternateCookieParser2 = (data: any) => {
    let reader = data.split('; ')
    let map: any = {}
    reader.forEach((element: String) => {
        let data = element.split('=');
        map[data[0]] = data[1];
    })
    return map
}

export { alternateCookieParser, alternateCookieParser2 }