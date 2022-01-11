import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { A7Component }  from './A7.component'
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
const A7Routes: Route[] = [
    {
        path: '',
        component: A7Component,
    },
];

@NgModule({
    declarations: [A7Component],
    imports: [
        RouterModule.forChild(A7Routes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class A7ComponentModule {}
