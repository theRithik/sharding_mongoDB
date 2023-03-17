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
