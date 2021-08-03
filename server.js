'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();


const server = express();
server.use(cors());
const PORT = process.env.PORT

server.use(express.json());
mongoose.connect('mongodb://localhost:27017/color', { useNewUrlParser: true, useUnifiedTopology: true });

const ColorSchema = new mongoose.Schema({
    title: String,
    imageUrl: String
})
const UseSchema = new mongoose.Schema({
    email: String,
    color: [ColorSchema]
})
const useModel = mongoose.model('user', UseSchema)


//---------------seed function--------
function seedCollection() {
    const userData = new useModel
        ({

            email: "quraanrazan282@gmail.com",
            color: [

                {
                    title: "Black",
                    imageUrl: "http://www.colourlovers.com/img/000000/100/100/Black.png",
                },
                {
                    title: "dutch teal",
                    imageUrl: "http://www.colourlovers.com/img/1693A5/100/100/dutch_teal.png",

                }
            ]

        }
        ,{
            email: 'sehammalkawi92@SpeechGrammarList.com',
            color: [
                {
                    title: "Black",
                    imageUrl: "http://www.colourlovers.com/img/000000/100/100/Black.png",
                },
                {
                    title: "dutch teal",
                    imageUrl: "http://www.colourlovers.com/img/1693A5/100/100/dutch_teal.png",
    
                }
            ]
        }
        )

userData.save();
console.log(userData)

}
// seedCollection()


//----------testing route ----------
server.get('/', getproofOfLife)

function getproofOfLife(req, res) {
    res.send('all good');
}

//------------------database routes----

server.get('/color',getColor);
server.put('/updatecolor/:id',updateColor);
server.delete('/deletecolor/:id',deletColor)

function getColor(req,res){
    let email=req.query.email;
    useModel.find({email:email},(error,userData)=>{
        if(error){res.send(error)}
        else{console.log(userData)
             res.send(userData[0].color)
        }
    })
}
function updateColor(req,res){
    const{email,title,imageUrl}=req.body;
    const index=Number(req.params.id);
    useModel.findOne({email:email},(error,userData)=>{
        if(error){res.send(error)}
        else{
            userData.color.splice(index,1,{
              title:title,
              imageUrl:imageUrl  
            })
            userData.save();
            res.send(userData.color)
        }
    })
}

function deletColor(req,res){
    let email=req.query.email;
    let index=Number(req.params.id);
    useModel.find({email:email},(error,userData)=>{
        if (error){res.send(error)}
            else{
let filterData=userData[0].color.filter((ele,idx)=>{
    if(idx !== index){return ele}
    userData[0].color=filterData;
    userData.save();
   res.send(userData[0].color) 
})
            }
    })
}
//----------api
server.get('/apidata',getapidata)

function getapidata(req,res){
    let url=`https://ltuc-asac-api.herokuapp.com/allColorData`;
    axios
    .get(url)
    .then
    let newColor=new Color(title,imageUrl);
    newColor.save();
    res.send(newColor)
    
   
}
class Color{
    constructor(title,imageUrl){
        this.title=title;
        this.imageUrl=imageUrl
    }
}


server.listen(PORT, () => {
    console.log(`listening on port${PORT}`);
})