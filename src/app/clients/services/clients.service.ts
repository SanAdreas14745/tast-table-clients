import {Injectable} from "@angular/core";
import {Client} from "../interfaces/client.interface";
import {EditableClientData} from "../interfaces/editable-client.interface";

@Injectable({providedIn: "root"})
export class ClientsService {
    addClient(clients: Client[], client: Client): Client[] {
        return [...clients, client]
    }

    editClient({clients, editedClient, client}: EditableClientData): Client[] {
        return clients.map(c => c === client ? editedClient : c);
    }

    deleteClients(clients: Client[], clientsDeleted: Client[]): Client[] {
        return clients.filter(client => !clientsDeleted.includes(client));
    }
}