# mongodb-versionr

## Requirements

MongoDB instances are required to have a [Replica Set](https://www.mongodb.com/docs/manual/replication/) enable to allow [Change Streams](https://www.mongodb.com/docs/manual/changeStreams/) invocation. A quick tutorial to enable this can be found [here](https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/#std-label-server-replica-set-deploy).

## Usage

### Setup

```javascript
const { MongoClient } = require("mongodb");
const versionr = require('mongodb-versionr');

const uri = "<your_mongo_client_uri>";
const client = new MongoClient(uri);

vnrContext = versionr.setContext(client);
```


### Registering a model listener

```javascript
vnrContext.registerModel({
    collection_name: "<your_collection>",
    database_name: "<your_database>",
    version_control_database_name: "<your_versioning_collection>",
    version_control_collection_name: "<your_versioning_collection>",
    keys: {
        "key1": "value1"
        ...
    }
});
```

If `version_control_database_name` is not provided, then `database_name` is set as the version control database.


### Terminate all registered listeners

```javascript
vnrContext.stopListeners();
```

