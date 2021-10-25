import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { GenericTableModule } from '@angular-generic-table/core';
import { TableEditComponent } from 'app/modules/admin/testing/table-edit/table-edit.component';

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
        MatIconModule,
        MatButtonModule,
    ],
})
export class TableEditModule {}
