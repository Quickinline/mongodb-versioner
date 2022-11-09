
import { ModelInput } from "./types"
import { MongoClient } from 'mongodb'
import { VersionrModel } from "./model";


export function setContext(Connection: MongoClient){
    
    // TODO: Test the connection

    return new MongoVersionrContext(Connection);
}




export class MongoVersionrContext {
    
    connection: MongoClient;

    models: VersionrModel[]

    constructor(connection: MongoClient){
        this.connection = connection;
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

