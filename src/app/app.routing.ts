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
                path: 'verify-email/:user_id',
                loadChildren: () =>
                    import(
                        'app/modules/auth/verify-email/verify-email.module'
                    ).then((m) => m.VerifyEmailModule),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
            {
                path: 'terms',
                loadChildren: () =>
                    import('app/modules/auth/terms/terms.module').then(
                        (m) => m.TermsModule
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
            //dashboard folder
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
                path: 'dashboard/:shopId/:shop_name/configurations',
                loadChildren: () =>
                    import(
                        'app/modules/admin/dashboard/configurations/configurations.module'
                    ).then((m) => m.ConfigurationsModule),
            },
            //general setting folder
            {
                path: 'HomeDeliverySetting',
                loadChildren: () =>
                    import(
                        'app/modules/admin/general-settings/home-delivery-setting/home-delivery-setting.module'
                    ).then((m) => m.HomeDeliverySettingModule),
            },
            {
                path: 'minOrderValue',
                loadChildren: () =>
                    import(
                        'app/modules/admin/general-settings/min-order-val/min-order-val.module'
                    ).then((m) => m.MinOrderValModule),
            },
            {
                path: 'minOrderConfig/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/general-settings/min-order-config/min-order-config.module'
                    ).then((m) => m.MinOrderConfigModule),
            },
            {
                path: 'homeDelConfig/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/general-settings/home-del-config/home-del-config.module'
                    ).then((m) => m.HomeDelConfigModule),
            },
            {
                path: 'whatsapp',
                loadChildren: () =>
                    import(
                        'app/modules/admin/general-settings/whatsapp/whatsapp.module'
                    ).then((m) => m.WhatsAppModule),
            },
            //invoice
            {
                path: 'invoice/:order_code',
                loadChildren: () =>
                    import('app/modules/admin/invoice/invoice.module').then(
                        (m) => m.InvoiceComponentModule
                    ),
            },
            //mobile folder
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
            // {
            //     path: 'product-info/:shopId',
            //     loadChildren: () =>
            //         import(
            //             'app/modules/admin/mobile/product-info/product-info.module'
            //         ).then((m) => m.ProductInfoModule),
            // },
            {
                path: 'A5/:order_code',
                loadChildren: () =>
                    import('app/modules/admin/A5/A5.module').then(
                        (m) => m.A5ComponentModule
                    ),
            },
            {
                path: 'A6/:order_code',
                loadChildren: () =>
                    import('app/modules/admin/A6/A6.module').then(
                        (m) => m.A6ComponentModule
                    ),
            },
            {
                path: 'A7/:order_code',
                loadChildren: () =>
                    import('app/modules/admin/A7/A7.module').then(
                        (m) => m.A7ComponentModule
                    ),
            },
            {
                path: 'A8/:order_code',
                loadChildren: () =>
                    import('app/modules/admin/A8/A8.module').then(
                        (m) => m.A8ComponentModule
                    ),
            },
            //orders folder
            {
                path: 'completed-orders/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/completed-orders/completed-orders.module'
                    ).then((m) => m.CompletedOrdersModule),
            },
            {
                path: 'completed-order-details/:order_code/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/completed-order-details/completed-order-details.module'
                    ).then((m) => m.CompletedOrderDetailsModule),
            },
            {
                path: 'pending-orders/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/pending-orders/pending-orders.module'
                    ).then((m) => m.PendingOrdersModule),
            },
            {
                path: 'order-details/:order_code/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/order-details/order-details.module'
                    ).then((m) => m.OrderDetailsModule),
            },
            {
                path: 'new-registration/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/new-registration/new-registration.module'
                    ).then((m) => m.NewRegistrationModule),
            },
            {
                path: 'open-orders/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/open-orders/open-orders.module'
                    ).then((m) => m.OpenOrdersModule),
            },
            {
                path: 'orders-fulfilled/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/orders-fulfilled/orders-fulfilled.module'
                    ).then((m) => m.OrdersFulfilledModule),
            },
            {
                path: 'sales/:shopId/:shop_name',
                loadChildren: () =>
                    import('app/modules/admin/orders/sales/sales.module').then(
                        (m) => m.SalesModule
                    ),
            },
            {
                path: 'unique-orders/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/orders/unique-orders/unique-orders.module'
                    ).then((m) => m.UniqueOrdersModule),
            },
            //payment folder
            {
                path: 'payment',
                loadChildren: () =>
                    import('app/modules/admin/payment/payment.module').then(
                        (m) => m.PaymentModule
                    ),
            },
            {
                path: 'payment-gateway/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/payment/payment-gateway/payment-gateway.module'
                    ).then((m) => m.PaymentGatewayModule),
            },
            {
                path: 'payment-gateway',
                loadChildren: () =>
                    import(
                        'app/modules/admin/payment/payment-gateway/payment-gateway.module'
                    ).then((m) => m.PaymentGatewayModule),
            },
            {
                path: 'manage-payment-gateway/:payment_id/:payment_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/payment/manage-payment-gateway/manage-payment-gateway.module'
                    ).then((m) => m.ManagePaymentGatewayModule),
            },
            {
                path: 'attach-payment/:payment_id/:payment_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/payment/attach-payment/attach-payment.module'
                    ).then((m) => m.AttachPaymentModule),
            },
            //product folder
            {
                path: 'product-config/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/product-config/product-config.module'
                    ).then((m) => m.ProductConfigModule),
            },
            {
                path: 'product-info/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/product-info/product-info.module'
                    ).then((m) => m.ProductInfoModule),
            },
            {
                path: 'add-product/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/add-product/add-product.module'
                    ).then((m) => m.AddProductModule),
            },
            {
                path: 'upload-products/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/upload-products/upload-products.module'
                    ).then((m) => m.UploadProductsModule),
            },
            {
                path: 'read-xl-data/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/upload-products/read-xl-data/read-xl-data.module'
                    ).then((m) => m.ReadXLDataModule),
            },
            {
                path: 'map-table-headers/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/upload-products/map-table-headers/map-table-headers.module'
                    ).then((m) => m.MapTableHeadersModule),
            },
            {
                path: 'upload-success/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/upload-products/upload-success/upload-success.module'
                    ).then((m) => m.UploadSuccessModule),
            },
            {
                path: 'add-category/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/add-category/add-category.module'
                    ).then((m) => m.AddCategoryModule),
            },
            {
                path: 'add-product-type/:shopId/:shop_name/:product_type',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/add-product-type/add-product-type.module'
                    ).then((m) => m.AddProductTypeModule),
            },
            //reports
            {
                path: 'reports',
                loadChildren: () =>
                    import('app/modules/admin/reports/reports.module').then(
                        (m) => m.ReportsComponentModule
                    ),
            },
            //help & guide
            {
                path: 'help',
                loadChildren: () =>
                    import('app/modules/admin/help/help.module').then(
                        (m) => m.HelpModule
                    ),
            },
            //settings folder
            {
                path: 'settings',
                loadChildren: () =>
                    import('app/modules/admin/settings/settings.module').then(
                        (m) => m.SettingsModule
                    ),
            },
            {
                path: 'confirm-deletion',
                loadChildren: () =>
                    import('app/modules/admin/settings/confirm-deletion/confirm-deletion.module').then(
                        (m) => m.ConfirmDeletionModule
                    ),
            },
            {
                path: 'sms-integration',
                loadChildren: () =>
                    import('app/modules/admin/settings/integration/sms-integration/sms-integration.module').then(
                        (m) => m.SMSIntegrationModule
                    ),
            },
            {
                path: 'session-values',
                loadChildren: () =>
                    import('app/modules/admin/settings/session-values/session-values.module').then(
                        (m) => m.SessionValuesModule
                    ),
            },
            //steps
            {
                path: 'steps/:shopId',
                loadChildren: () =>
                    import('app/modules/admin/steps/steps.module').then(
                        (m) => m.StepsModule
                    ),
            },
            //store folder
            {
                path: 'store',
                loadChildren: () =>
                    import('app/modules/admin/store/store.module').then(
                        (m) => m.StoreModule
                    ),
            },
            {
                path: 'create-shop',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/create-shop/create-shop.module'
                    ).then((m) => m.CreateShopModule),
            },
            {
                path: 'store-summary/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/store-summary/store-summary.module'
                    ).then((m) => m.StoreSummaryModule),
            },
            {
                path: 'shop-details/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/shop-details/shop-details.module'
                    ).then((m) => m.ShopDetailsModule),
            },
            {
                path: 'store-payment/:shopId/:shop_name',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/store-payment/store-payment.module'
                    ).then((m) => m.StorePaymentModule),
            },
            {
                path: 'store-payment/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/store-payment/store-payment.module'
                    ).then((m) => m.StorePaymentModule),
            },
            {
                path: 'store-activation/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/store-activation/store-activation.module'
                    ).then((m) => m.StoreActivationModule),
            },
            {
                path: 'store-setting',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/store-setting/store-setting.module'
                    ).then((m) => m.StoreSettingModule),
            },
            {
                path: 'change-domain-success',
                loadChildren: () =>
                    import(
                        'app/modules/admin/store/store-setting/change-domain-succcess/change-domain-succcess.module'
                    ).then((m) => m.ChangeDomainSuccessModule),
            },
            //auth folder
            {
                path: 'profile',
                loadChildren: () =>
                    import('app/modules/auth/profile/profile.module').then(
                        (m) => m.ProfileModule
                    ),
            },
            {
                path: 'my-subscription',
                loadChildren: () =>
                    import(
                        'app/modules/auth/my-subscription/my-subscription.module'
                    ).then((m) => m.MySubscriptionModule),
            },
            //example folders
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
                path: 'table-edit/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/testing/table-edit/table-edit.module'
                    ).then((m) => m.TableEditModule),
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
                path: 'inventory/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/product/inventory/inventory.module'
                    ).then((m) => m.InventoryModule),
            },
            {
                path: 'table-edit/:shopId',
                loadChildren: () =>
                    import(
                        'app/modules/admin/testing/table-edit/table-edit.module'
                    ).then((m) => m.TableEditModule),
            },
            {
                path: 'analytics',
                loadChildren: () =>
                    import(
                        'app/modules/admin/dashboards/analytics/analytics.module'
                    ).then((m) => m.AnalyticsModule),
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
