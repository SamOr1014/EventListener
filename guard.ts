import {Request, Response, NextFunction} from 'express'

export function isLoggedin(req:Request, res:Response, next:NextFunction) {
    console.log(req.session['user'])
    if (req.session['user']) {
        next()
    }
    else {
        res.redirect('/login')
    }
}

export async function isLoggedinForExplore (req:Request, res:Response, next:NextFunction) {
    console.log("Texting for MiddleWare")
    if (!req.session["user"]) {
        res.status(401).json({ success: false, message: "Visitor" });
        return;
      } 
      next();
    }

export function isAdmin(req:Request, res:Response, next:NextFunction) {
    if (!req.session['adminStatus']){
        res.redirect('404.html')
        return
    }
    next()
}