import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild
} from "@angular/core";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {TableControllerDirective} from "./table-controller.directive";
import {IconBtnComponent} from "../icon-btn/icon-btn.component";
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {MatSort, MatSortModule} from "@angular/material/sort";

@Component({
    selector: 'table-container',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        NgClass,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
        NgTemplateOutlet,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll,
        TableControllerDirective,
        IconBtnComponent,
    ],
    templateUrl: './table-container.component.html',
    styleUrls: ['./table-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContainerComponent<T> implements AfterViewInit {
    private _columns: string[] = [];
    private _rows: T[] = [];
    readonly selection = new SelectionModel<T>(true, []);
    @Input() isMultipleSelect = false;
    @Input() hasAddBtn = false;
    @Input() hasDeleteBtn = false;

    @Input({required: true}) set rows(rows: T[]) {
        this._rows = rows
        this.selection.clear()
    }

    @Input({required: true}) set columns(columns: string[]) {
        if (this.isMultipleSelect)
            this._columns = ['select', ...columns]
        else this._columns = columns;
    }

    @Output() headerRowClick = new EventEmitter<string>();
    @Output() rowClick = new EventEmitter<T>();
    @Output() addNewRowButtonClick = new EventEmitter<void>();
    @Output() deleteRowButtonClick = new EventEmitter<T[]>();

    @ViewChild(MatTable) private readonly matTable?: MatTable<T>
    @ViewChild(MatSort) sort: MatSort | null = null;

    @ContentChild('headerCell', {static: true}) headerCell: TemplateRef<unknown> | null = null;
    @ContentChild('rowCell', {static: true}) rowCell: TemplateRef<unknown> | null = null;

    private get matTableDataSource(): MatTableDataSource<T> {
        return this.matTable?.dataSource as MatTableDataSource<T>;
    }

    get rows(): T[] {
        return this._rows;
    }

    get columns(): string[] {
        return this._columns;
    }

    ngAfterViewInit() {
        this.matTableDataSource.sort = this.sort
    }

    toggleAllRows(): void {
        const matDataSource = this.matTableDataSource;

        if (this.isAllRowsSelected()) {
            this.selection.clear();
        } else {
            this.selection.select(...matDataSource.data)
        }
    }

    isAllRowsSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.matTableDataSource.data.length;

        return numSelected === numRows;
    }

    isSelectedRows(): boolean {

        return this.selection.selected.length > 0
    }

    onAddNewRowButtonClick(): void {
        this.addNewRowButtonClick.emit()
    }

    onDeleteRowButtonClick(): void {
        this.deleteRowButtonClick.emit(this.selection.selected)
    }

    onRowClick(element: T): void {
        this.rowClick.emit(element)
    }
}
