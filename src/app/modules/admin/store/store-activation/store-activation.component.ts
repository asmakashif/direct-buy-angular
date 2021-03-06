import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreActivationService } from 'app/modules/admin/store/store-activation/store-activation.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { DashboardService } from '../../dashboard/dashboard.service';

declare var $: any;

@Component({
    selector: 'app-store-activation',
    templateUrl: './store-activation.component.html',
    styleUrls: ['./store-activation.component.scss'],
})
export class StoreActivationComponent implements OnInit {
    faStore = faStore;
    faWhatsapp = faWhatsapp;
    domainname: any;
    profileData: any;
    storeCheckoutForm: FormGroup;
    sub;
    params: any;
    data: any;
    shop_payment_status: any;
    flashMessage: string;
    firstname: any;

    constructor(
        private flashMessagesService: FlashMessagesService,
        private formBuilder: FormBuilder,
        private apiService: StoreActivationService,
        private routes: ActivatedRoute,
        private _router: Router,
        private cd: ChangeDetectorRef,
        private _dashboardService: DashboardService
    ) { }

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.apiService
            .getShopDetailsById(routeParams.shopId, user_id)
            .subscribe((data: any) => {
                this.data = data;
                this.shop_payment_status = this.data.shop_payment_status;
                this.cd.detectChanges();
                console.log(this.data.shopId);
            });

        this._dashboardService
            .getRetailerDetailsById(user_id)
            .subscribe((data) => {
                this.profileData = data;
                this.firstname = this.profileData.firstname;
                this.domainname = this.profileData.domainname;
                this.cd.detectChanges();
            });
        // this.routes.paramMap.subscribe((params) => {
        //     this.storeCheckoutForm.patchValue(params);

        //     const shopId = params.get('shopId');
        //     console.log('Url shopId: ', shopId);
        // });
        // this.sub = this.routes.paramMap.subscribe((params) => {
        //     this.params = params;
        //     console.log(this.params);
        // });
        this.storeCheckoutForm = this.formBuilder.group({
            shop_name: ['', Validators.required],
            shop_price: ['', Validators.required],
        });
    }

    createRzpayOrder(data) {
        // call api to create order_id
        this.payWithRazor(data);
    }

    payWithRazor(data) {
        //console.log(data);
        const options: any = {
            key: 'rzp_test_xFaGl7So24RVzR',
            //key: 'rzp_live_DIWnd6wTffAjzl',
            amount: 499900, // amount should be in paise format to display Rs 1255 without decimal point
            //amount: 100,
            currency: 'INR',
            name: 'ARSC Networks', // company name or product name
            description: '', // product description
            image: '/assets/images/logo/logo_new.png', // company logo or product image
            order_id: '', // order_id created by you in backend
            modal: {
                // We should prevent closing of the form when esc key is pressed.
                escape: false,
            },
            prefill: {
                email: data.email,
                contact: data.contact
            },
            notes: {
                // include notes if any
            },
            theme: {
                color: '#0c238a',
            },
        };
        options.handler = (response, error) => {
            options.response = response;
            const routeParams = this.routes.snapshot.params;
            //console.log(response.razorpay_payment_id);
            const shopPayment = {
                shopId: routeParams.shopId,
                shop_payment_amount: 4999,
                shop_payment_id: response
                // shop_payment_id: response.razorpay_payment_id
            };
            // call your backend api to verify payment signature & capture transaction
            this.apiService
                .updateShopPayment(shopPayment)
                .subscribe((data) => {
                    this.showFlashMessage('success');
                    this.ngOnInit();
                    this.cd.detectChanges();
                });
        };
        options.modal.ondismiss = () => {
            // handle the case when user closes the form while transaction is in progress
            console.log('Transaction cancelled.');
        };
        const rzp = new this.apiService.nativeWindow.Razorpay(options);
        rzp.open();
    }

    activateTrial(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        this.apiService
            .updateTrialStatus(routeParams.shopId, user_id)
            .subscribe((data) => {
                this.showFlashMessage('success');
                this.ngOnInit();
                this.cd.detectChanges();

                // this._router
                //     .navigate(['/store-activation/' + routeParams.shopId])
                //     .then(() => {
                //         window.location.reload();
                //     });
                // this.flashMessagesService.show(
                //     // Array of messages each will be displayed in new line
                //     'Store activated successfully',
                //     {
                //         cssClass: 'alert-success', // Type of flash message, it defaults to info and success, warning, danger types can also be used
                //         timeout: 4000, // Time after which the flash disappears defaults to 4000ms
                //     }
                // );
            });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this.cd.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this.cd.markForCheck();
        }, 3000);
    }

    complete() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/dashboard']);
    }

    prevStep(): void {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/steps/' + routeParams.shopId]);
    }

    nextStep(): void {
        const routeParams = this.routes.snapshot.params;
        const user_id = localStorage.getItem('user_id');
        //window.location.reload();
        this._router
            .navigate(['/steps/' + routeParams.shopId])
            .then(() => {
                this.ngOnInit();
                // window.location.reload();
            });

        // this.apiService
        //     .getShopDetailsById(routeParams.shopId, user_id)
        //     .subscribe((data: any) => {
        //         this.shopdata = data;
        //         if (this.shopdata.dbcreation_status == 1) {
        //             const confirmation = this._fuseConfirmationService.open({
        //                 title: 'Proceed Next',
        //                 message:
        //                     'You will be moved out of this page to proceed with next step',
        //                 actions: {
        //                     confirm: {
        //                         label: 'Okay',
        //                     },
        //                 },
        //             });
        //             // Subscribe to the confirmation dialog closed action
        //             confirmation.afterClosed().subscribe((result) => {
        //                 // If the confirm button pressed...
        //                 if (result === 'confirmed') {
        //                     this._router.navigate([
        //                         '/store-activation/' + routeParams.shopId,
        //                     ]);
        //                 }
        //             });
        //         } else {
        //             const confirmation = this._fuseConfirmationService.open({
        //                 title: 'Proceed Next',
        //                 message: 'Setup the store to proceed with next step',
        //                 actions: {
        //                     confirm: {
        //                         label: 'Okay',
        //                     },
        //                 },
        //             });
        //             // Subscribe to the confirmation dialog closed action
        //             confirmation.afterClosed().subscribe((result) => {
        //                 // If the confirm button pressed...
        //                 if (result === 'confirmed') {
        //                 }
        //             });
        //         }
        //     });
    }

    // nextStep() {
    //     const routeParams = this.routes.snapshot.params;
    //     var storeId = routeParams.shopId;

    //     $(document).ready(function () {
    //         $('#nextStep').click(function () {
    //             var base_url = window.location.origin;
    //             window.location.href = base_url + '/steps/' + storeId;
    //         });
    //     });
    // }

    isMobile() {
        let check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk) |tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || (<any>window).opera);
        return check;
    }
}
