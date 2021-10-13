import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'login',
                loadChildren: () =>
                    import('app/modules/auth/login/login.module').then(
                        (m) => m.LoginModule
                    ),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Landing routes
    // {
    //     path: '',
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty',
    //     },
    //     children: [
    //         {
    //             path: 'home',
    //             loadChildren: () =>
    //                 import('app/modules/landing/home/home.module').then(
    //                     (m) => m.LandingHomeModule
    //                 ),
    //         },
    //     ],
    // },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('app/modules/admin/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'dashboard/:shopId/:shop_name',
                loadChildren: () =>
                    import('app/modules/admin/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'project',
                loadChildren: () =>
                    import('app/modules/admin/project/project.module').then(
                        (m) => m.ProjectModule
                    ),
            },
            {
                path: 'example',
                loadChildren: () =>
                    import('app/modules/admin/example/example.module').then(
                        (m) => m.ExampleModule
                    ),
            },
            {
                path: 'create',
                loadChildren: () =>
                    import('app/modules/admin/create/create.module').then(
                        (m) => m.CreateModule
                    ),
            },
            {
                path: 'create-shop',
                loadChildren: () =>
                    import(
                        'app/modules/admin/create-shop/create-shop.module'
                    ).then((m) => m.CreateShopModule),
            },
            {
                path: 'product-config/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product-config/product-config.module'
                    ).then((m) => m.ProductConfigModule),
            },
            {
                path: 'product-info/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product-info/product-info.module'
                    ).then((m) => m.ProductInfoModule),
            },
            {
                path: 'store-summary/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store-summary/store-summary.module'
                    ).then((m) => m.StoreSummaryModule),
            },
            {
                path: 'shop-details/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/shop-details/shop-details.module'
                    ).then((m) => m.ShopDetailsModule),
            },
            {
                path: 'shop-configuration/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/shop-configuration/shop-configuration.module'
                    ).then((m) => m.ShopConfigurationModule),
            },
            {
                path: 'orders/completed-orders/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/completed-orders/completed-orders.module'
                    ).then((m) => m.CompletedOrdersModule),
            },
            {
                path: 'orders/completed-order-details/:order_code/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/completed-order-details/completed-order-details.module'
                    ).then((m) => m.CompletedOrderDetailsModule),
            },
            {
                path: 'orders/pending-orders/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/pending-orders/pending-orders.module'
                    ).then((m) => m.PendingOrdersModule),
            },
            {
                path: 'orders/pending-order-details/:order_code/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/pending-order-details/pending-order-details.module'
                    ).then((m) => m.PendingOrderDetailsModule),
            },
            {
                path: 'steps/:shopId',
                loadChildren: () =>
                    import('app/modules/admin/steps/steps.module').then(
                        (m) => m.StepsModule
                    ),
            },
            {
                path: 'payment-gateway/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/payment-gateway/payment-gateway.module'
                    ).then((m) => m.PaymentGatewayModule),
            },
            {
                path: 'store-payment/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store-payment/store-payment.module'
                    ).then((m) => m.StorePaymentModule),
            },
            {
                path: 'store-activation/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store-activation/store-activation.module'
                    ).then((m) => m.StoreActivationModule),
            },
            {
                path: 'mobile/steps/:shopId',
                loadChildren: () =>
                    import('app/modules/admin/mobile/steps/steps.module').then(
                        (m) => m.StepsModule
                    ),
            },
            {
                path: 'mobile/product-config/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/mobile/product-config/product-config.module'
                    ).then((m) => m.ProductConfigModule),
            },
            {
                path: 'mobile/product-info/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/mobile/product-info/product-info.module'
                    ).then((m) => m.ProductInfoModule),
            },
        ],
    },

    //Customer Routes
    {
        path: '',

        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/customer/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
        ],
    },
];
