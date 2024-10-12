import {FormControl, FormGroup} from "@angular/forms";

/**
 * Utility type for FormGroup
 *
 * @example
 * type SomeForm = FormGroup<FormType<SomeInterface>>;
 * const formGroup: SomeForm = this.fb.group({...})
 */
export type FormType<T> = {
    [P in keyof T]: T[P] extends 'object'
        ? FormGroup<FormType<T[P]>>
        : FormControl<T[P]>;
};
