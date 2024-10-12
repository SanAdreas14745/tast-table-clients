import {inject, Injectable} from '@angular/core';
import {Client} from "../interfaces/client.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ClientAddEditDialogComponent} from "../components/client-add-edit-dialog/client-add-edit-dialog.component";
import {ClientDeleteDialogComponent} from "../components/client-delete-dialog/client-delete-dialog.component";
import {ClientAddEditDialogData} from "../components/client-add-edit-dialog/client-add-edit-dialog-data.interface";
import {ClientDeleteDialogData} from "../components/client-delete-dialog/client-delete-dialog-data.interface";
import {TranslateService} from "@ngx-translate/core";


@Injectable()
export class ClientsDialogService {
    private readonly dialog = inject(MatDialog);
    private readonly translate = inject(TranslateService);

    openClientDialog(client?: ClientAddEditDialogData['client']): MatDialogRef<ClientAddEditDialogComponent, Client> {
        const title = this.translate.instant('clients.' + (client ? 'edit_client' : 'add_client'))
        const dialogRef = this.dialog.open<
            ClientAddEditDialogComponent,
            ClientAddEditDialogData,
            Client
        >(
            ClientAddEditDialogComponent, {
                autoFocus: false,
                data: {title, client}
            }
        );

        return dialogRef;
    }

    openDeleteClientDialog(clients: Client[]): MatDialogRef<ClientDeleteDialogComponent, boolean> {
        const data: ClientDeleteDialogData = {
            title: this.translate.instant('clients.delete_clients'),
            clients
        };

        const dialogRef = this.dialog.open<
            ClientDeleteDialogComponent,
            ClientDeleteDialogData,
            boolean
        >(ClientDeleteDialogComponent, {autoFocus: false, data});

        return dialogRef;
    }
}
