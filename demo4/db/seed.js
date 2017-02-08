db.createCollection('players');
db.players.remove({});
db.players.insertOne({
  name: 'Ash',
  age: 10,
  items: [
    { name: 'Poké Ball', quantity: 5 },
    { name: 'Escape rope', quantity: 1 }
  ]
});
