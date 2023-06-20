const express=require('express');
const app=express();
const path=require('path');
const multer=require('multer');
const upload=multer({dest:'uploads/'})
const {mergePdfs}=require('./merge');

app.use('/static',express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'templates/index.html'));
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    console.log(req.files);
 let d=await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    // res.send({data:req.files});
    res.redirect(`http://localhost:8000/static/${d}.pdf`)
    
  })


app.listen(8000,()=>{
    console.log("app listening on port 8000");
})
