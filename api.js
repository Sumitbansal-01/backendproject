const express = require('express')
const fs=require('fs')
const bodyParser = require("body-parser")
const app = express()
const port =  process.env.PORT ||4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getcount',(req,res)=> {
    res.send(fs.readFileSync('count.json','utf-8'))
})

app.get('/get', (req, res) => {
  res.send(fs.readFileSync('table.json','utf-8'))
})
app.post("/post",(req,res) => {
    const id =req.body.id
    const desc=req.body.desc
    let data=JSON.parse(fs.readFileSync('table.json','utf-8'))
    if (req.body.update===undefined){
    data.push({'id':id,'desc':desc})
    }else if(req.body.update) {
        data=data.map(n=>{
            if (n.id==id){
                n.desc=desc
            }
            return n
        })
    }
    fs.readFile('count.json','utf-8',(err,data)=>{
        if(err){
            console.error(err)
        }else{
            fs.writeFile('count.js',JSON.stringify(JSON.parse(Number(data)+1)),(err)=>{
                if(err){
                    console.error(err)
                }
            })
        }
    })
    fs.writeFileSync('table.json',JSON.stringify(data))
    console.log(req.body,data);
    res.statusCode=200
    res.end('Completed')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})