import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },

    // Auth routes for guests
    {
        path: '',
        // canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
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
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
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
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
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
                    import(
                        'app/modules/admin/testing/project/project.module'
                    ).then((m) => m.ProjectModule),
            },
            {
                path: 'example',
                loadChildren: () =>
                    import(
                        'app/modules/admin/testing/example/example.module'
                    ).then((m) => m.ExampleModule),
            },
            {
                path: 'example/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/testing/example/example.module'
                    ).then((m) => m.ExampleModule),
            },
            {
                path: 'create',
                loadChildren: () =>
                    import(
                        'app/modules/admin/testing/create/create.module'
                    ).then((m) => m.CreateModule),
            },
            {
                path: 'testing/table-edit/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/testing/table-edit/table-edit.module'
                    ).then((m) => m.TableEditModule),
            },
            {
                path: 'store',
                loadChildren: () =>
                    import('app/modules/admin/store/store.module').then(
                        (m) => m.StoreModule
                    ),
            },
            {
                path: 'store/create-shop',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/create-shop/create-shop.module'
                    ).then((m) => m.CreateShopModule),
            },
            {
                path: 'product/product-config/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/product-config/product-config.module'
                    ).then((m) => m.ProductConfigModule),
            },
            {
                path: 'product/product-info/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/product-info/product-info.module'
                    ).then((m) => m.ProductInfoModule),
            },
            {
                path: 'ecommerce',
                loadChildren: () =>
                    import('app/modules/admin/ecommerce/ecommerce.module').then(
                        (m) => m.ECommerceModule
                    ),
            },
            {
                path: 'academy',
                loadChildren: () =>
                    import('app/modules/admin/academy/academy.module').then(
                        (m) => m.AcademyModule
                    ),
            },
            {
                path: 'product/inventory/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/inventory/inventory.module'
                    ).then((m) => m.InventoryModule),
            },
            {
                path: 'store/store-summary/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/store-summary/store-summary.module'
                    ).then((m) => m.StoreSummaryModule),
            },
            {
                path: 'store/shop-details/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/shop-details/shop-details.module'
                    ).then((m) => m.ShopDetailsModule),
            },
            {
                path: 'dashboard/:shopId/:shop_name/configurations',
                loadChildren: () =>
                    import(
                        'app/modules/admin/dashboard/configurations/configurations.module'
                    ).then((m) => m.ConfigurationsModule),
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
                path: 'orders/order-details/:order_code/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/order-details/order-details.module'
                    ).then((m) => m.OrderDetailsModule),
            },
            {
                path: 'orders/new-registration/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/new-registration/new-registration.module'
                    ).then((m) => m.NewRegistrationModule),
            },
            {
                path: 'orders/open-orders/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/open-orders/open-orders.module'
                    ).then((m) => m.OpenOrdersModule),
            },
            {
                path: 'orders/orders-fulfilled/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/orders-fulfilled/orders-fulfilled.module'
                    ).then((m) => m.OrdersFulfilledModule),
            },
            {
                path: 'orders/sales/:shopId',
                loadChildren: () =>
                    import('app/modules/admin/orders/sales/sales.module').then(
                        (m) => m.SalesModule
                    ),
            },
            {
                path: 'orders/unique-orders/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/unique-orders/unique-orders.module'
                    ).then((m) => m.UniqueOrdersModule),
            },
            {
                path: 'steps/:shopId',
                loadChildren: () =>
                    import('app/modules/admin/steps/steps.module').then(
                        (m) => m.StepsModule
                    ),
            },
            {
                path: 'payment',
                loadChildren: () =>
                    import('app/modules/admin/payment/payment.module').then(
                        (m) => m.PaymentModule
                    ),
            },
            {
                path: 'payment/payment-gateway/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/payment/payment-gateway/payment-gateway.module'
                    ).then((m) => m.PaymentGatewayModule),
            },
            {
                path: 'payment/payment-gateway',
                loadChildren: () =>
                    import(
                        'app/modules/admin/payment/payment-gateway/payment-gateway.module'
                    ).then((m) => m.PaymentGatewayModule),
            },
            {
                path: 'payment/manage-payment-gateway',
                loadChildren: () =>
                    import(
                        'app/modules/admin/payment/manage-payment-gateway/manage-payment-gateway.module'
                    ).then((m) => m.ManagePaymentGatewayModule),
            },
            {
                path: 'store/store-payment/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/store-payment/store-payment.module'
                    ).then((m) => m.StorePaymentModule),
            },
            {
                path: 'store/store-activation/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/store-activation/store-activation.module'
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
            {
                path: 'profile',
                loadChildren: () =>
                    import('app/modules/auth/profile/profile.module').then(
                        (m) => m.ProfileModule
                    ),
            },
            {
                path: 'my-account',
                loadChildren: () =>
                    import(
                        'app/modules/auth/my-account/my-account.module'
                    ).then((m) => m.MyAccountModule),
            },
            {
                path: 'testing/table-edit/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/testing/table-edit/table-edit.module'
                    ).then((m) => m.TableEditModule),
            },

            {
                path: 'HomeDeliverySetting',
                loadChildren: () =>
                    import(
                        'app/modules/admin/home-delivery-setting/home-delivery-setting.module'
                    ).then((m) => m.HomeDeliverySettingModule),
            },
            {
                path: 'minOrderValue',
                loadChildren: () =>
                    import(
                        'app/modules/admin/min-order-val/min-order-val.module'
                    ).then((m) => m.MinOrderValModule),
            },
            {
                path: 'minOrderConfig/:shop_id',
                loadChildren: () =>
                    import(
                        'app/modules/admin/min-order-config/min-order-config.module'
                    ).then((m) => m.MinOrderConfigModule),
            },
            {
                path: 'homeDelConfig/:shop_id',
                loadChildren: () =>
                    import(
                        'app/modules/admin/home-del-config/home-del-config.module'
                    ).then((m) => m.HomeDelConfigModule),
            },
            {
                path: 'reports',
                loadChildren: () =>
                    import(
                        'app/modules/admin/reports/reports.module'
                    ).then((m) => m.ReportsComponentModule),
            },
            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () =>
                    import(
                        'app/modules/admin/error/error-404/error-404.module'
                    ).then((m) => m.Error404Module),
            },
            { path: '**', redirectTo: '404-not-found' },
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
            {
                path: 'cust-details/:id',
                loadChildren: () =>
                    import(
                        'app/modules/customer/cust-details/cust-details.module'
                    ).then((m) => m.CustomerDetailsModule),
            },
            // {
            //     path: 'searchPage',
            //     loadChildren: () =>
            //         import('app/modules/customer/search-page/search-page.module').then(
            //             (m) => m.SearchPageModule

            //         ),
            // },
        ],
    },
];
