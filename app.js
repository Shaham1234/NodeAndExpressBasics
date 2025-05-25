const express = require('express');
const app = express();

const people = require('./people');

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.get('/', (req,res) => {
res.status(200).json({ success:true, data:people});
});


app.put('/api/people/:id', (req, res) => {
  
  const {id} = req.params;
  const {name} = req.body;

  const person = people.find((person) => person.id === Number(id));

  if(!person) {
    return res.status(404).json({ success:false, msg:`There is no such person with ${id}` });
  }

  const newPeople = people.map((person) => {
    if(person.id === Number(id)){
      person.name = name;
    }
    return person;
  });

  res.status(200).json({ success:true, data:newPeople });
});


app.delete('/api/people/:id', (req, res) => {
  
  const person = people.find((person) => person.id === Number(req.params.id));

  if(!person) {
    return res.status(404).json({ success:false, msg:`There is no such person with ${id}` });
  }

  const newPeople = people.filter((person) => {
    return (person.id !== Number(req.params.id));
  });

  res.status(200).json({ success:true, data:newPeople });

})

app.listen(5000, console.log('Server started on 5000'));