import { ModelInput } from "./types"
import { ListDatabasesResult, MongoClient } from 'mongodb'
import { VersionrModel } from "./model";


export function setContext(Connection: MongoClient) {
    // Test the connection
    return new MongoVersionrContext(Connection);
}


export class MongoVersionrContext {

    private connection: MongoClient;
    private database_names: string[];

    public models: VersionrModel[] = [];

    constructor(connection: MongoClient) {
        this.connection = connection;
        console.log("Init context")

        // this.connection.db("admin").command({ ping: 1 }).then(data => {
        //     console.log("Connected successfully to server");
        // })

        // // this part retrieves the database List in a promise
        // // we access a random DB instance then get the admin db instance
        // // from there we get listDatabases()
        // connection.db().admin().listDatabases().then(
        //     (dbs: ListDatabasesResult) => {
        //         this.database_names = dbs.databases.map(database => database.name)
        //         console.log(this.database_names)
        //     }
        // )

    }

    registerModel(modelInput: ModelInput) {
        const model = new VersionrModel(this.connection, modelInput);
        this.models.push(model);
    }

    stopListeners() {
        while (this.models.length > 0) {
            let model = this.models.pop();
            model.stopListener();
        }
    }
}

