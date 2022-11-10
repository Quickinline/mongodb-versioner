import { Collection, MongoClient, ChangeStream } from "mongodb";
import { ModelInput } from "./types";


export class VersionrModel {

    public collectionName: string;
    public databaseName: string;
    public versionControlDatabaseName?: string
    public versionControlCollectionName: string;
    public keys?: Object | JSON;

    private streamObject: ChangeStream
    private connection: MongoClient
    private collection: Collection
    private versioningCollection: Collection

    constructor(connection: MongoClient, modelInput: ModelInput) {
        // set the input variables 
        this.collectionName = modelInput.collection_name;
        this.databaseName = modelInput.database_name;
        this.versionControlDatabaseName = modelInput.version_control_database_name ? modelInput.version_control_database_name : modelInput.database_name;
        this.versionControlCollectionName = modelInput.version_control_collection_name;
        this.keys = modelInput.keys;

        // copy the connection Object
        this.connection = connection;
        // instantiate
        this.collection = this.connection.db(this.databaseName).collection(this.collectionName)
        this.versioningCollection = this.connection.db(this.versionControlDatabaseName).collection(this.versionControlCollectionName)

        this.startListener();
    }

    private startListener() {
        this.streamObject = this.collection.watch();

        this.streamObject.on('change', (data) => {
            console.log('Next ', data)

            if(data.operationType === "insert"){
                this.versioningCollection.insertOne({
                    content: data.fullDocument
                })
            }else if(data.operationType === "update"){
                this.versioningCollection.insertOne({
                    content: data.fullDocument
                })
            }
  
        })

        this.streamObject.on('error', (err) => {
            console.log('Error ', err)
        })

    }

    public stopListener() {
        if (!this.streamObject.closed) this.streamObject.close();
    }
}