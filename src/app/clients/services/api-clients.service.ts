import {inject, Injectable} from '@angular/core';
import {Client} from "../interfaces/client.interface";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class ApiClientsService {
    private readonly httpClient = inject(HttpClient)

    getClients(): Observable<Client[]> {
        return this.httpClient.get<{ users: Client[] }>('/task1').pipe(
            map(({users}) => users),
        )
    }
}
