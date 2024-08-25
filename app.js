const express=require('express');
const QRCode=require('qrcode')
const app=express();
const port=3000;
//Generate QR code
const generateQRCode=async(data)=>{
    try{
        const url=await QRCode.toDataURL(data);
        return url;

    }catch(err){
        console.error(err);
    }
};
app.get('/generate',async(req,res)=>{
    const data=req.query.data || 'https://www.example.com';
    const qrCodeUrl=await generateQRCode(data);
    res.send(`<img src="${qrCodeUrl}" alt="QR Code"><br><a href="/">Generate another QR code</a>`);
});
app.get('/',(req,res)=>{
    res.send(`<form action="/generate" method="get">
            <label for="data">Enter data for QR code</label><br>
            <input type="text" id="data" name="data"><br>
            <input type="submit" value="Generate QR Code">
           </form>`);
    });
app.listen(port, ()=>{
    console.log(`server running at https://localhost:${port}`)
    });

   