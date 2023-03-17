sudo mkdir data/shard1
sudo mkdir data/shard2  
sudo mkdir data/shard3

windows 
cd data
md shard1
md shard2
md shard3

sudo mongod --shardsvr --dbpath /data/shard1  --port 2001 

sudo mongod --shardsvr --dbpath /data/shard2 --port 2002 

sudo mongod --shardsvr --dbpath /data/shard3 --port 2003

//Config Server
sudo mkdir data/config1
sudo mkdir data/config2
sudo mkdir data/config3

windows
cd data
md config1
md config2
md config3

sudo mongod --configsvr --dbpath /data/config1 --port 2011 --replSet rs0
sudo mongod --configsvr --dbpath /data/config3 --port 2013 --replSet rs0
sudo mongod --configsvr --dbpath /data/config2 --port 2012 --replSet rs0


//Run from any config server
rs.initiate(
  {
    _id: "rs0",
    configsvr: true,
    members: [
      { _id : 0, host : "localhost:2011" },
      { _id : 1, host : "localhost:2012" },
      { _id : 2, host : "localhost:2013" }
    ]
  }
)

//New Cmd
mongos --configdb "rs0/localhost:2011,localhost:2012,localhost:2013" --fork --logpath log.mongos0 --port 27200

//Connection to mongos
mongo --port 27200


//Add shards
sh.addShard("localhost:2001")
sh.addShard("localhost:2002")
sh.addShard("localhost:2003")


show dbs
use config
show collections
db.shards.find()



use mongoMart1

sh.enableSharding("mongoMart1")



//enable on collection level
sh.shardCollection("mongoMart1.shop1",{"_id":"hashed"})
for (var i =1;i<=20;i++)db.shop1.insert({x:i})

//remove shard
use admin
db.runCommand({removeShard: "shard0000"})



////Adding replica in shard

sudo mongod --port 2001 --dbpath Desktop/Replica/rs1 --replSet --shardA --oplogSize 128
sudo mongod --port 2002 --dbpath Desktop/Replica/rs2 --replSet --shardA --oplogSize 128
sudo mongod --port 2003 --dbpath Desktop/Replica/rs3 --replSet --shardA --oplogSize 128

sudo mongod --port 2004 --dbpath Desktop/Replica/rs1 --replSet --shardB --oplogSize 128
sudo mongod --port 2005 --dbpath Desktop/Replica/rs2 --replSet --shardB --oplogSize 128
sudo mongod --port 2006 --dbpath Desktop/Replica/rs3 --replSet --shardB --oplogSize 128

sudo mongod --port 2007 --dbpath Desktop/Replica/rs1 --replSet --shardC --oplogSize 128
sudo mongod --port 2008 --dbpath Desktop/Replica/rs2 --replSet --shardC --oplogSize 128
sudo mongod --port 2009 --dbpath Desktop/Replica/rs3 --replSet --shardC --oplogSize 128


sudo mongod --shardsvr --dbpath Desktop/shard/shard1 --replSet shardA --port 3001

sudo mongod --shardsvr --dbpath Desktop/shard/shard2 --replSet shardB --port 3002 

sudo mongod --shardsvr --dbpath Desktop/shard/shard3  --replSet shardC -port 3003


////////////////////////////////
mongoexport --db  nodeevng --collection first  --type=csv  --fields _id,name,class   --out  Downloads/first.csv


mongoexport --host="localhost:27017" --collection=first --db=nodeevng --out=first.json


mongoimport --db=users --collection=contacts --file=first.json

mongodump
mongodump -d=test -c=records -q='{ "a": { "$gte": 3 }, "date": { "$lt": { "$date": "2016-01-01T00:00:00.000Z" } } }'

mongorestore  dump/

bsondump --outFile=collection.json collection.bson
