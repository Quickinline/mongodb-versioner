import { MongoClient, } from "mongodb";
import { ModelInput } from "./types";


export class VersionrModel {

    collectionName: string;
    databaseName: string;
    versionControlCollectionName?: string
    keys: Object | JSON
    private streamObject: any

    constructor(connection: MongoClient, modelInput: ModelInput){
        this.collectionName = modelInput.collection_name;
        this.databaseName = modelInput.database_name;

        this.startListener();
    }

    private startListener() {

    }
    
    public stopListener() {

    }
}