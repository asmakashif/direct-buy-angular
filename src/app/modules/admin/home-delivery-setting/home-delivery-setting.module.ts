import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { HomeDeliverySettingComponent } from './home-delivery-setting.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
const MinOrderRoutes: Route[] = [
    {
        path: '',
        component: HomeDeliverySettingComponent,
    },
];

@NgModule({
    declarations: [HomeDeliverySettingComponent],
    imports: [
        RouterModule.forChild(MinOrderRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class HomeDeliverySettingModule {}
