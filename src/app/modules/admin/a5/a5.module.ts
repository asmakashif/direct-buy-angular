import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { A5Component }  from './a5.component'
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
const A5Routes: Route[] = [
    {
        path: '',
        component: A5Component,
    },
];

@NgModule({
    declarations: [A5Component],
    imports: [
        RouterModule.forChild(A5Routes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class A5ComponentModule {}
