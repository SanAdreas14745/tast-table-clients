import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Client} from "../interfaces/client.interface";

@Injectable({providedIn: 'root'})
export class ClientsState {
    private readonly clients$$ = new BehaviorSubject<Client[]>([]);
    readonly clients$ = this.clients$$.asObservable();

    get clients(): Client[] {
        return this.clients$$.getValue();
    }

    set clients(clients: Client[]) {
        this.clients$$.next(clients);
    }
}
