const express = require('express');
const app =  express();

const users =[{
    user:'jay',
    kidneys:[{
        health:false
    }]
}]
app.use(express.json());// to read the body while using the post method
app.get('/',function(req,res){
    const jayKidney = users[0].kidneys;
    
    const numberofkidneys = jayKidney.length;
    let numberOfHealthykidneys = 0;
    for(let i=0;i<numberofkidneys;i++) {
        // console.log(jayKidney[i].health+"jay's kidney");
        if (jayKidney[i].health){
            numberOfHealthykidneys+=1;
        }
    }
const unhealthyKidneys =numberofkidneys-numberOfHealthykidneys;
    res.json({
        numberofkidneys,
        numberOfHealthykidneys,
        unhealthyKidneys
    })
});
app.post('/',function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({health : isHealthy});
    res.json({
        "msg":"Added Sucesssfully"
    })
});

app.put('/',function(req,res){
       if(isEmptyKidney()){
        for(let i=0; i< users[0].kidneys.length;i++){
            users[0].kidneys[i].health = true;
        };
        res.json({
            msg: 'Kidney Repaced with Healthy Kidney'
        });
        }else{
            res.status(411).json({
                "msg":"no bad kidney to be replaced"
            })
        }
})

app.delete('/',function(req,res){
    let Emptykidney = false
    if(isEmptyKidney()){
        const newKidneys =[];
    for(let i=1; i < users[0].kidneys.length;i++){
        if(users[0].kidneys[i].health){
            newKidneys.push({
                health:true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({
        msg: "Removed the unhealthy kidney",
    })
    }else{
        res.status(411).json({
            "msg":"you do not have Unhealthy kidneys"
        });
    }
});

function isEmptyKidney(){
    let isEmpty = false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].health){
            isEmpty=true;
        }
    }
    // console.log(isEmpty);
    return isEmpty
};
app.listen(3001);