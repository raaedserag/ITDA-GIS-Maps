@ECHO OFF

setx NODE_ENV "production" /m
setx DAMEN_ORACLE_USER "GEO" /m
setx DAMEN_ORACLE_PASS "geo123456" /m
setx DAMEN_ORACLE_DB "GEODB" /m
setx DAMEN_MYSQL_USER "smart" /m
setx DAMEN_MYSQL_PASS "$m@rtP@y!@#4" /m
setx DAMEN_MYSQL_DB "epayment2_production" /m
setx DAMEN_MONGO_URI "mongodb://mongoset1:27017,mongoset2:27018,mongoset3:27019/geo-data?replicaSet=mongodb-replicaset" /m

PAUSE