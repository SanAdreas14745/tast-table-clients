import {NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import {ChangeDetectionStrategy, Component, forwardRef, Input,} from '@angular/core';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators,} from '@angular/forms';
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ClearBtnComponent} from "../clear-btn/clear-btn.component";
import {TranslateModule} from "@ngx-translate/core";
import {IMaskDirective} from "angular-imask";
import {FactoryArg} from "imask";

enum ErrorKey {
    MIN_LENGTH = 'minlength',
    MAX_LENGTH = 'maxlength',
    REQUIRED = 'required',
    PATTERN = 'pattern',
    EMAIL = 'email'
}

@Component({
    selector: 'text-input',
    standalone: true,
    imports: [
        NgIf,
        NgSwitch,
        NgSwitchCase,
        NgTemplateOutlet,
        FormsModule,
        IMaskDirective,
        TranslateModule,
        MatInputModule,
        MatFormFieldModule,
        ClearBtnComponent,
    ],
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true,
        },
    ],
})
export class TextInputComponent implements ControlValueAccessor {
    private _value = '';
    @Input() label = '';
    @Input() placeholder = '';
    @Input() hint = '';
    @Input() mask?: FactoryArg

    readonly validators = Validators;
    readonly errorKeys = ErrorKey;

    isDisabled = false;
    isFocused = false;

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value
        this.onChange?.(value);
    }

    control?: FormControl<string>;


    onChange?: (value: string) => void;
    onTouched?: () => void;

    validate(control: FormControl<string>): void {
        this.control = control;
    }

    registerOnChange(fn: typeof this.onChange): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: typeof this.onTouched): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(value: string): void {
        this.value = value;
    }

    onFocus(): void {
        this.isFocused = true;
    }

}
