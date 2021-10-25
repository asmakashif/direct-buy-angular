import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SharedModule } from 'app/shared/shared.module';
import { ProjectComponent } from 'app/modules/admin/testing/project/project.component';
//import { projectRoutes } from 'app/modules/admin/dashboards/project/project.routing';

const projectRoutes: Route[] = [
    {
        path: '',
        component: ProjectComponent,
    },
];

@NgModule({
    declarations: [ProjectComponent],
    imports: [
        RouterModule.forChild(projectRoutes),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule.forRoot(),
        CommonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectModule {}
