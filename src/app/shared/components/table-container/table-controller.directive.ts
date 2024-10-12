import {Directive, inject, Input, OnChanges, SimpleChanges} from "@angular/core";
import {MatTable, MatTableDataSource} from "@angular/material/table";

/**
 * Директива для управления данными, передаваемыми в таблицу.
 *
 */

@Directive({
    selector: '[tableDataController]',
    standalone: true,
})
export class TableControllerDirective<T> implements OnChanges {
     private readonly table = inject(MatTable)
     readonly dataSource = new MatTableDataSource<T>([]);

    @Input({alias: 'tableDataController', required: true}) tableData!: T[]

    constructor() {
       this.initDataSource();
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        const {tableData} = simpleChanges;

        if (tableData) {
            this.setData(tableData.currentValue as T[]);
        }
    }

    private initDataSource(): void {
        this.table.dataSource = this.dataSource;
    }

    private setData(data: T[]): void {
        this.dataSource.data = data;
    }
}