
import { ModelInput } from "./types"
import { ListDatabasesResult, MongoClient } from 'mongodb'
import { VersionrModel } from "./model";


export function setContext(Connection: MongoClient){
    
    // TODO: Test the connection

    return new MongoVersionrContext(Connection);
}




export class MongoVersionrContext {
    
    connection: MongoClient;
    database_names: string[];

    models: VersionrModel[]

    constructor(connection: MongoClient){
        this.connection = connection;

        // this part retrieves the database List in a promise
        // we access a random DB instance then get the admin db instance
        // from there we get listDatabases()
        connection.db().admin().listDatabases().then(
            (dbs: ListDatabasesResult) => {
                this.database_names = dbs.databases.map(database => database.name)
            }
        )

    }
    
    registerModel(modelInput: ModelInput){

        const model = new VersionrModel(this.connection, modelInput);
        this.createChangeStream(model);
    }

    
    createChangeStream(model: VersionrModel) {
        throw new Error("Method not implemented.");
    }

    stopListeners(){
        // TODO Iterating over the models and shutting the
    }
}

