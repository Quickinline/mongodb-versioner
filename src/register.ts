import { ModelInput } from "./types"
import { MongoClient } from 'mongodb'
import { VersionrModel } from "./model";


export function setContext(Connection: MongoClient) {
    return new MongoVersionrContext(Connection);
}


export class MongoVersionrContext {

    private connection: MongoClient;

    public models: VersionrModel[] = [];

    constructor(connection: MongoClient) {
        this.connection = connection;
    }

    public registerModel(modelInput: ModelInput) {
        const model = new VersionrModel(this.connection, modelInput);
        this.models.push(model);
    }

    public stopListeners() {
        while (this.models.length > 0) {
            let model = this.models.pop();
            model.stopListener();
        }
    }
}

