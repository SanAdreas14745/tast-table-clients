import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {ClientsFacade} from "../../clients.facade";
import {ObjectKeysPipe} from "../../../shared/pipes/object-keys.pipe";
import {TableContainerComponent} from "../../../shared/components/table-container/table-container.component";
import {Client} from "../../interfaces/client.interface";
import {filter, tap} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import {MatTableModule} from "@angular/material/table";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ClientsDialogService} from "../../services/clients-dialog.service";

@Component({
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        AsyncPipe,
        MatTableModule,
        MatDialogModule,
        TranslateModule,
        ObjectKeysPipe,
        TableContainerComponent,
    ],
    templateUrl: './clients-table.component.html',
    styleUrls: ['./clients-table.component.scss'],
    providers: [ClientsDialogService],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ClientsTableComponent {
    private readonly destroyRef = inject(DestroyRef)
    private readonly clientsFacade = inject(ClientsFacade);
    private readonly clientsDialogService = inject(ClientsDialogService);

    readonly clients$ = this.clientsFacade.clients$

    openClient(client?: Client) {
        const action: (editedClient: Client) => void = client
            ? (editedClient) => this.clientsFacade.editClient(editedClient, client)
            : (editedClient) => this.clientsFacade.addClient(editedClient)

        this.clientsDialogService.openClientDialog(client).afterClosed().pipe(
            filter(Boolean),
            tap(action),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe();
    }

    deleteClients(clients: Client[]) {
        this.clientsDialogService.openDeleteClientDialog(clients).afterClosed().pipe(
            filter(Boolean),
            tap(() => this.clientsFacade.deleteClients(clients)),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe();
    }
}
