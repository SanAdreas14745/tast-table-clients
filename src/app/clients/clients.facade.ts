import {Observable, of, skipUntil, tap} from "rxjs";
import {Client} from "./interfaces/client.interface";
import {inject, Injectable} from "@angular/core";
import {ClientsState} from "./state/clients.state";
import {ApiClientsService} from "./services/api-clients.service";
import {StorageKey} from "../shared/enums/storage-key.enum";
import {StorageService} from "../shared/services/storage.service";
import {EditableClientData} from "./interfaces/editable-client.interface";
import {ClientsService} from "./services/clients.service";

@Injectable({providedIn: "root"})
export class ClientsFacade {
    private readonly clientState = inject(ClientsState)
    private readonly storageService = inject(StorageService)
    private readonly apiClientsService = inject(ApiClientsService)
    private readonly clientsService = inject(ClientsService)

    private get clientsFromStorage(): Client[] | null {
        return this.storageService.get<Client[]>(StorageKey.CLIENTS)
    }

    private get clients(): Client[] {
        return this.clientState.clients;
    }

    private set clients(clients: Client[]) {
        this.clientState.clients = clients;
        this.storageService.set(StorageKey.CLIENTS, clients);
    }

    initClients(): Observable<Client[]> {
        if (this.clients.length)
            return of(this.clients);

        if (this.clientsFromStorage?.length) {
            this.clients = this.clientsFromStorage;

            return of(this.clientsFromStorage);
        }

        return this.apiClientsService.getClients().pipe(
            tap((c) => requestAnimationFrame(() => this.clients = c))
        )
    }

    readonly clients$ = this.clientState.clients$.pipe(
        skipUntil(this.initClients())
    )

    addClient(client: Client): void {
        const updatedClients = this.clientsService.addClient(this.clients, client)
        this.clients = updatedClients;
    }

    editClient(editedClient: Client, client: Client): void {
        const data: EditableClientData = {
            clients: this.clients,
            editedClient,
            client
        }
        const updatedClients = this.clientsService.editClient(data)
        this.clients = updatedClients
    }

    deleteClients(clients: Client[]): void {
        const updatedClients = this.clientsService.deleteClients(
            this.clients,
            clients
        )
        this.clients = updatedClients;
    }
}
