import express from 'express'
import {form} from '../server'
import { Request, Response, NextFunction } from "express";
import type { Fields, Files } from "formidable";
export const event = express.Router()

declare global {
    namespace Express {
      interface Request {
        form?: {
          fields: Fields;
          files: Files;
        };
      }
    }
  }

export const formidableMiddleware = (req: Request, res: Response, next: NextFunction) => {
    form.parse(req, (err, fields, files) => { 
      if (err) {
        console.error(err);
        res.sendStatus(500)
        return;
      }
      req.form = { fields, files };
      next();
    });
  };

event.get('/', (req,res)=>{
    res.redirect('createEvent.html')
})

event.post('/', formidableMiddleware, async (req, res) => {
    try {
      const form = req.form!;
      const eventName = form.fields.eventName;
      const type = form.fields.type;
      const numberOfPart = form.fields.participants;
      const venue = form.fields.venue;
      const Fee = form.fields.Fee;
      const content = form.fields.content;
      const imageFileName = form.files.image?.["originalFilename"];
      const imageSavedName = form.files.image?.["newFilename"];

      console.log(eventName,type,numberOfPart,venue,Fee,content,imageFileName,imageSavedName)  
  
    } catch (err) {
      console.error(err.message);
    } finally {
     
      res.json({ success: true });
   
    }
  });