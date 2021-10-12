import { Route } from '@angular/router';
import { LoginComponent } from 'app/modules/auth/login/login.component';

export const LoginRoutes: Route[] = [
    {
        path: '',
        component: LoginComponent,
    },
];
