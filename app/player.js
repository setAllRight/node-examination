'use strict';

const db = require('../lib/mongodb.js');
const RES = require('../config/config.js').RES;
const conllection = `NBA`;

 let addPlayer = async function addPlayer (req, res, next) {
  let {name,id,position}=req.body;
  if(!name||!position||!id || id*1 < 0){
      res.send(RES.INVALIDINPUT);
  }
    await db.insertOne(conllection,req.body);
    res.send(RES.SUCCESS);
};

 let deletePlayer = async function deletePlayer (req, res, next) {
  let {playerid}=req.params;
  if(playerid == '' || playerid == null){
      res.send(RES.INVALIDIDSUPPLIED);
      return;
  }
  let getUserResult = await db.find(conllection,{id:playerid});
  if(getUserResult.length <= 0){
      res.send(RES.PLAYERNOTFOUND);
      return;
  }
   await db.deleteOne(conllection,{id:playerid});
  res.send(RES.SUCCESS)
};

 let getPlayerById = async function getPlayerById (req, res, next) {
    let {playerid} = req.params;
    let whereObject = '';
    if(playerid !='' && playerid != null && playerid*1 >0){        
        whereObject = {id:playerid};
    }
    let result = await db.find(conllection,whereObject);
    if(result.length <= 0){
        res.send(RES.PLAYERNOTFOUND);
        return;
    }
    let success = RES.SUCCESSANDDATA;
    success.data = result;
    res.send(success);

};

let updatePlayer = async function updatePlayer (req, res, next) {
  let {name,id,position}=req.body;
    if(id == '' || id === null || id*1<0){
        res.send(RES.INVALIDIDSUPPLIED);
        return;
    }
    let result = await db.find(conllection,{id:id,name:name});
    if(result.length<=0){
        res.send(RES.PLAYERNOTFOUND);
        return;
    }
    if(result.name != name){
        res.send(RES.VALIDATIONEXCEPTION);
        return;
    }
     await db.update(conllection,{id:id},{$set:{position}});
    res.send(RES.SUCCESS);

};
module.exports ={
  addPlayer,
  deletePlayer,
  getPlayerById,
  updatePlayer
}