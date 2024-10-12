import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ClientFormService} from "../../services/client-form.service";
import {TextInputComponent} from "../../../shared/components/text-input/text-input.component";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {Client} from "../../interfaces/client.interface";
import {ClientAddEditDialogData} from "./client-add-edit-dialog-data.interface";
import {IMaskDirective} from "angular-imask";
import {FactoryArg} from "imask";

type ClientDialogRef = MatDialogRef<ClientAddEditDialogComponent, Client>;

@Component({
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        IMaskDirective,
        MatDialogModule,
        MatButtonModule,
        TranslateModule,
        TextInputComponent,
    ],
    templateUrl: './client-add-edit-dialog.component.html',
    styleUrls: ['./client-add-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ClientAddEditDialogComponent {
    private readonly dialogRef: ClientDialogRef = inject(MatDialogRef<ClientAddEditDialogComponent>);
    readonly clientFormGroup = inject(ClientFormService).getClientFormGroup();
    readonly data: ClientAddEditDialogData = inject(MAT_DIALOG_DATA)
    readonly phoneMask: FactoryArg = {
        mask: '+{7}0000000000',
        lazy: true,
        placeholderChar: '  '
    }

    constructor() {
        if (this.data.client) {
            this.clientFormGroup.patchValue(this.data.client);
        }
    }

    onSaveButtonClick(): void {
        this.dialogRef.close({...this.clientFormGroup.getRawValue()})
    }
}
