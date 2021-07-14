const express = require ('express')
const app = express()
const friends = require ('./models/friendlist')

// middleware
app.use(express.json());

//read friendslist(return all friends)
app.get('/', (req, res, next)=> {
    res.json(friends);
    next();
})
    // posting to friend list
    app.post('/friends',(req, res, next)=> {
        friends.push({
            id: friends.length + 1,
            name:req.body.name,
            age : req.body.age ,
            sex : req.body.sex,
            phone : req.body.phone
        });
        res.json({ message: "New friend added"})
        next();
});


//update friends

app.put('/:id', (req, res, next) => {
    if (!req.body.name ) {
      res.status(400).json({ message: "Bad Request" });
    } else {
      let updateIndex = friends.map(function (friend) {
        return friend.id;
      }).indexOf(parseInt(req.params.id));
      friends[updateIndex] = {
        id: req.params.id,
        name: req.body.name,
        age : req.body.age ,
        sex : req.body.sex,
        phone : req.body.phone
        
      }
      res.json({ message: "friend id " + req.params.id + " updated." });
    }
    next()
  });
  
  //Delete a friends 
  app.delete('/:id',(req, res)=>{
    let removeIndex = friends.map((friend)=>{
         return friend.id; 
         })
         friends.indexOf(req.params.id);
         if(removeIndex === -1){ 
         res.json({message: "Not found"}); 
         } else { 
         friends.splice(removeIndex, 1); 
         res.json({message: "friend id " + req.params.id + " removed."});
         }
      });

app.listen(5000,()=> console.log (`server is running at http://localhost:5000/`));