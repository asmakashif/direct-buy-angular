import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { A8Component }  from './A8.component'
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
const A8Routes: Route[] = [
    {
        path: '',
        component: A8Component,
    },
];

@NgModule({
    declarations: [A8Component],
    imports: [
        RouterModule.forChild(A8Routes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class A8ComponentModule {}
