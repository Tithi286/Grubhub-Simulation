# CMPE273-lab2
## Download Kafka-Stable.zip and open kafka_2.11-1.1.0 in terminal
## Start Zookeeper using below command 
    bin/zookeeper-server-start.sh config/zookeeper.properties
    
## Start Kafka using below command
    bin/kafka-server-start.sh config/server.properties
    
## Create topics using below command
    bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic

## Start Frontend(Buyer/Restaurant)
    npm install 
    npm start (to start the frontend)
    
## Start Backend(Buyer/Restaurant)
    npm install
    node index.js (to start the backend)
    
##  Start kafka-backend
    npm install
    npm start (to start kafka-backend)
    
