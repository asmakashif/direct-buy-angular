import { Route } from '@angular/router';
import { VerifyEmailComponent } from 'app/modules/auth/verify-email/verify-email.component';

export const verifyEmailRoutes: Route[] = [
    {
        path: '',
        component: VerifyEmailComponent,
    },
];
