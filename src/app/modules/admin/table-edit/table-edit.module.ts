import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { GenericTableModule } from '@angular-generic-table/core';
import { TableEditComponent } from 'app/modules/admin/table-edit/table-edit.component';

const tableEditRoutes: Route[] = [
    {
        path: '',
        component: TableEditComponent,
    },
];

@NgModule({
    declarations: [TableEditComponent],
    imports: [
        RouterModule.forChild(tableEditRoutes),
        GenericTableModule,
        FormsModule,
    ],
})
export class TableEditModule {}
