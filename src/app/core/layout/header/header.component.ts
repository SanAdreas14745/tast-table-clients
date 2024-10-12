import {Component} from '@angular/core';
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NavbarComponent],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
}
