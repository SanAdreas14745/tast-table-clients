import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'clear-btn',
    standalone: true,
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './clear-btn.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearBtnComponent {
    @Output() readonly iconClicked = new EventEmitter<void>()

    onIconClicked(): void {
        this.iconClicked.emit();
    }
}
