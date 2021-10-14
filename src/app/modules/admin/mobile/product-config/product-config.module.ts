import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'app/shared/shared.module';
import { HotTableModule } from '@handsontable/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import 'handsontable/dist/handsontable.min.css';
import 'pikaday/css/pikaday.css';
import { ProductConfigComponent } from 'app/modules/admin/mobile/product-config/product-config.component';
//import { projectRoutes } from 'app/modules/admin/dashboards/project/project.routing';

const productConfigRoutes: Route[] = [
    {
        path: '',
        component: ProductConfigComponent,
    },
];

@NgModule({
    declarations: [ProductConfigComponent],
    imports: [
        RouterModule.forChild(productConfigRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatStepperModule,
        SharedModule,
        HotTableModule,
        MatPaginatorModule,
        NgbModule,
        NgSelectModule,
        NgxBootstrapMultiselectModule,
        NgMultiSelectDropDownModule.forRoot(),
    ],
})
export class ProductConfigModule {}
