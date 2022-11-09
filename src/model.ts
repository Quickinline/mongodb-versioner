import { Collection, MongoClient, ChangeStream } from "mongodb";
import { ModelInput } from "./types";


export class VersionrModel {

    collectionName: string;
    databaseName: string;
    versionControlCollectionName?: string
    keys: Object | JSON;

    private streamObject: ChangeStream
    private connection: MongoClient
    private collection: Collection

    constructor(connection: MongoClient, modelInput: ModelInput){
        // set the input variables 
        this.collectionName = modelInput.collection_name;
        this.databaseName = modelInput.database_name;
        this.versionControlCollectionName = modelInput.version_control_collection_name;
        this.keys = modelInput.keys;

        // copy the connection Object
        this.connection = connection;
        // instantiate
        this.collection = this.connection.db(this.databaseName).collection(this.collectionName)

        this.startListener();
    }

    private startListener() {

        this.streamObject =  this.collection.watch()

        this.streamObject.on('change', (next) => {
            console.log('Next ', next)
        })

    }
    
    public stopListener() {

    }
}