import {
    Component,
    Inject,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import * as Bowser from 'bowser';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { SignInService } from 'app/modules/auth/sign-in/sign-in.service';
import { DeviceUUID } from 'device-uuid';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    arrString: string[];
    domain: string;
    userAgent: Bowser.Parser.ParsedResult;
    browser: Bowser.Parser.Parser;
    userAgentDetails: string;
    browserDetails: string;
    otpVerify: any;
    deviceId: string;
    uuid: any;
    fieldvalue = '';
    verifyOtp: any;
    retailerData: any;

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _apiService: SignInService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.uuid = new DeviceUUID().get();
        console.log(this.uuid);
        this.deviceId = new DeviceUUID().get();
        this.otpVerify = localStorage.getItem('otpVerify');
        this.userAgent = Bowser.parse(window.navigator.userAgent);
        this.browser = Bowser.getParser(window.navigator.userAgent);
        this.userAgentDetails = JSON.stringify(this.userAgent, null, 4);
        this.browserDetails = JSON.stringify(
            this.browser.getBrowser(),
            null,
            4
        );
        var URL = window.location.href;
        var arr = URL.split('/');
        var array = arr[2];
        this.arrString = array.split(':');
        //this.domain = arrString[0];
        console.log(this.arrString);
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            otp: [''],
            rememberMe: [''],
        });
    }

    keyup(event) {
        this._authService
            .checkOtpVerification(this.signInForm.value)
            .subscribe((data) => {
                this.verifyOtp = data;

                this.otpVerify = this.verifyOtp.otpVerify;
                console.log(this.otpVerify);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    verifyEmail(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.verifyEmail(this.signInForm.value).subscribe(
            (data) => {
                this.retailerData = data;
                console.log(this.retailerData);
                const user_id = this.retailerData.user_id;
                console.log(user_id);
                this._router.navigate(['verify-email/' + user_id]);
            },
            (response) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Wrong email or password',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }
    /**
     * Sign in
     */
    signIn(): void {
        console.log(this.signInForm.value);
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value).subscribe(
            () => {
                // Set the redirect url.
                // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                // to the correct page after a successful sign in. This way, that url can be set via
                // routing file and we don't have to touch here.

                // var domainanme = localStorage.getItem('domainname');
                // const retailerId = localStorage.getItem('user_id');
                // window.location.href =
                //     'http://localhost:4200/dashboard/' + retailerId;
                // window.location.href =
                //     'https://' +
                //     domainanme +
                //     '.brokeronline.in/dashboard/' +
                //     retailerId;
                // this.document.location.href =
                //     'https://' + domainanme + '.brokeronline.in/dashboard';

                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';

                // // Navigate to the redirect url
                this._router.navigateByUrl(redirectURL);
            },
            (response) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Wrong email or password',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }

    // signIn(): void {
    //     // Return if the form is invalid
    //     if (this.signInForm.invalid) {
    //         return;
    //     }

    //     // Disable the form
    //     this.signInForm.disable();

    //     // Hide the alert
    //     this.showAlert = false;

    //     // Sign in
    //     this._apiService.signIn(this.signInForm.value).subscribe(
    //         () => {
    //             // Set the redirect url.
    //             // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
    //             // to the correct page after a successful sign in. This way, that url can be set via
    //             // routing file and we don't have to touch here.
    //             const redirectURL =
    //                 this._activatedRoute.snapshot.queryParamMap.get(
    //                     'redirectURL'
    //                 ) || '/signed-in-redirect';

    //             // Navigate to the redirect url
    //             this._router.navigateByUrl(redirectURL);
    //         },
    //         (response) => {
    //             // Re-enable the form
    //             this.signInForm.enable();

    //             // Reset the form
    //             this.signInNgForm.resetForm();

    //             // Set the alert
    //             this.alert = {
    //                 type: 'error',
    //                 message: 'Wrong email or password',
    //             };

    //             // Show the alert
    //             this.showAlert = true;
    //         }
    //     );
    // }
}
