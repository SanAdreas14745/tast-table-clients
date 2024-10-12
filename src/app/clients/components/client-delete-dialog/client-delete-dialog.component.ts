import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {ClientDeleteDialogData} from "./client-delete-dialog-data.interface";

type ClientDialogRef = MatDialogRef<ClientDeleteDialogComponent, boolean>;

@Component({
    standalone: true,
    imports: [
        NgIf,
        MatDialogModule,
        MatButtonModule,
        TranslateModule,
    ],
    templateUrl: './client-delete-dialog.component.html',
    styleUrls: ['./client-delete-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ClientDeleteDialogComponent {
    private readonly dialogRef: ClientDialogRef = inject(MatDialogRef<ClientDeleteDialogComponent>);
    readonly data: ClientDeleteDialogData = inject(MAT_DIALOG_DATA)

    onDeleteButtonClick() {
        this.dialogRef.close(true)
    }
}
