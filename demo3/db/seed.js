db.createCollection('itemNameList');
db.itemNameList.remove({});
db.itemNameList.insertOne({ items: [ 'Poké Ball', 'Potion', 'Revive' ] });
