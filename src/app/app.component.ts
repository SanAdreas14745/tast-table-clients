import {Component} from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, RouterLink, MatButtonModule],
    templateUrl: './app.component.html',
})
export class AppComponent {
}
