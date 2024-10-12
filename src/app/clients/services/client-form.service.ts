import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormType} from "../../shared/types/form-type.type";
import {Client} from "../interfaces/client.interface";

type ClientForm = Required<Client>

type ClientFormGroup = FormGroup<FormType<ClientForm>>;

@Injectable({providedIn: "root"})
export class ClientFormService {
    private readonly fb = inject(FormBuilder);

    getClientFormGroup(): ClientFormGroup {
        const formGroup: ClientFormGroup = this.fb.nonNullable.group({
            name: ['', [
                Validators.required,
                Validators.minLength(2)
            ]],
            surname: ['', [
                Validators.required,
                Validators.minLength(2),
            ]],
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            phone: ['', {
                validators: [
                    Validators.minLength(12)
                ],

            }]
        })

        return formGroup;
    }
}