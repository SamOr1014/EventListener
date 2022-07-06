import {Request, Response, NextFunction} from 'express'

export async function isLoggedin(req:Request, res:Response, next:NextFunction) {
    if (req.session['userStatus']) {
        next()
    }
    else {
        res.redirect('/login')
    }
}

export async function isAdmin(req:Request, res:Response, next:NextFunction) {
    if (req.session['adminStatus']){
        next();
    }
    else {
        res.redirect('404.html')
    }
}