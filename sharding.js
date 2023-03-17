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
