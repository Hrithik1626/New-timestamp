import express from 'express'
import fs from 'fs'
import { format } from 'date-fns';
import path from 'path';

const PORT= 8000;
let app=express()
app.use(express.json())
app.get('/',(req,res)=>{
              let today=format(new Date(),'dd-MM-yyyy;HH-mm-ss')
              const filePath = `TimeStamp/${today}.txt`;
              fs.writeFileSync(filePath,`${today}`,'utf8')
             let data=fs.readFileSync(filePath,'utf8')
            try {
              res.status(200).send(data)
            }catch(error){
              req.res(500).send('Internal server error')
            }
})
app.get("/getTextFiles",(req, res)=>{
              const folderPath = "TimeStamp";
              fs.readdir(folderPath, (err,files)=>{
                            if (err){
                                          console.log(err);
                                          res
                                          .status(500)
                                          .send("An error")
                            }else{
                                          const textFiles = files.filter((file)=>path.extname(file) ===".txt");
                                          res.status(200).json(textFiles);
                            }
                            });
              });

              app.listen(PORT,()=>console.log(`App is listening to ${PORT}`))