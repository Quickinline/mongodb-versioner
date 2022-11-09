# mongodb-versionr


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
    version_control_collection_name: "<your_versioning_collection>"
    keys: {
        "key1": "value1"
        ...
    }
});
```


### Terminate all registered listeners

```javascript
vnrContext.stopListeners();
```