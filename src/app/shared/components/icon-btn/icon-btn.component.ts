import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'icon-button',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './icon-btn.component.html',
    styleUrls: ['./icon-btn.component.scss'],
})

export class IconBtnComponent {
    @Input({required: true}) iconName!: string
    @Input() isDisabled = false

    @Output() readonly iconBtnClicked = new EventEmitter<void>()

    onButtonClicked() {
        this.iconBtnClicked.emit();
    }
}
