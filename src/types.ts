import { MongoClient } from "mongodb"

export type ModelInput = {
    collection_name: string,
    database_name: string,
    version_control_collection_name?: string
    keys: Object | JSON
}
