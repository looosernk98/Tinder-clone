import express from "express";
import mongoose from "mongoose"
import Cors from 'Cors';
import Cards from "./dbCards.js"

// App config
 const app= express();
 const port= process.env.PORT || 3000;
 const connection_url=`mongodb+srv://admin:ritnC30lO62rPzeY@cluster0.nxwfo.mongodb.net/tinderdb?retryWrites=true&w=majority`

// MiddleWares

app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
// API Endpoints
app.get('/',(req,res)=>res.status(200).send("hello niranjan"));

app.post('/tinder/cards',(req,res)=>{
    const dbCard=req.body;

    Cards.create(dbCard, (err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });
});

app.get('/tinder/cards',(req,res)=>{

Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

// Listener
app.listen(port,()=>console.log(`listening on localhost : ${port}`));
