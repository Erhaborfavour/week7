const express = require ('express')
const app = express()
const friends = require ('./models/friendlist')

// middleware
app.use(express.json());

//read friendslist(return all friends)
app.get('/', (req, res)=> {
    res.json(friends);


});

app.listen(5000,()=> console.log (`server is running at http://localhost:5000/`));