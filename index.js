const express=require('express');
const Joi=require('joi');

const server=express();

var management =[
    { name :"Sachin",password:"Sachin123",profession:"student",id:101},
    { name :"Shewag",password:"Shewag123",profession:"Developer",id:102},
    { name :"Dravid",password:"Dravid123",profession:"Tester",id:103},
    { name :"Dhoni",password:"Dhoni123",profession:"Manager",id:104},
    { name :"Yuvraj",password:"Yuvraj123",profession:"Intern",id:105}
];

server.use(express.json());

const port=process.env.PORT || 4000;

server.get('/',function(req, res){
    res.send('<h1>----welcome To Users Management----</h1>');
});


server.get('/users',function(req, res){
    res.send(management);
});

server.get('/users/:id',function(req,res){
    const array1 = management.find(c => c.id == parseInt(req.params.id));
    if(!array1) return res.status(404).send("user data not found.");

    res.send(array1);
});

server.post('/users/add',function(req,res){

    const { error }= validateData(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);   
    }

    const data=
        {
            name: req.body.name,
            password: req.body.password,
            profession: req.body.profession,
            id: management.length + 1
        };

        management.push(data);
        res.send(data);
});


server.put('/users/update/:id',function(req,res){
    const { error }= validateData(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);   
    }

    const array2 = management.find( c => c.id===parseInt(req.params.id));
    if(!array2) return res.status(404).send("entered id is invalid");
    
    array2.name = req.body.name;
    array2.password = req.body.password;
    array2.profession = req.body.profession;
    res.send(array2);
});

server.delete('/users/delete/:id',function(req, res){
    const array3 = management.find( c => c.id===parseInt(req.params.id));
    if(!array3) return res.status(404).send("entered id is invalid");
    
    const index = management.indexOf(array3);
    management.splice(index,1);
    res.send(array3);
});



//server.get()

//server.post()

//server.delete()

function validateData(data)
{
    const schema = {
        name : Joi.string().min(5).required(),
        password : Joi.string().min(5).required(),
        profession : Joi.string().min(5).required()
    };
    return Joi.validate(data, schema);
}

server.listen(port, function(){
    console.log(`server is running at port ${port}`);
});












