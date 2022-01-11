import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { A6Component }  from './a6.component'
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
const A6Routes: Route[] = [
    {
        path: '',
        component: A6Component,
    },
];

@NgModule({
    declarations: [A6Component],
    imports: [
        RouterModule.forChild(A6Routes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class A6ComponentModule {}
