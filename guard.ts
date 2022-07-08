import {Request, Response, NextFunction} from 'express'

export async function isLoggedin(req:Request, res:Response, next:NextFunction) {
    if (req.session['user']) {
        next()
    }
    else {
        res.redirect('/login')
    }
}

export async function isLoggedinForExplore (req:Request, res:Response, next:NextFunction) {
    console.log("Texting2")
    if (!req.session["user"]) {
        res.status(401).json({ success: false, message: "Visitor" });
        return;
      }
      next();
    };

export async function isAdmin(req:Request, res:Response, next:NextFunction) {
    if (req.session['adminStatus']){
        next();
    }
    else {
        res.redirect('404.html')
    }
}