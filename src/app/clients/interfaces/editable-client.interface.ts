import {Client} from "./client.interface";

export interface EditableClientData {
    clients: Client[],
    editedClient: Client,
    client: Client
}