import {
    ChangeDetectorRef,
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
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class VerifyEmailComponent implements OnInit {
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
    email: any;
    password: any;
    flashMessage: string;

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _apiService: SignInService,
        private cd: ChangeDetectorRef
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        const routeParams = this._activatedRoute.snapshot.params;
        console.log(routeParams.user_id);
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            otp: ['', Validators.required],
            rememberMe: [''],
        });

        this._authService
            .getRetailerDetailsById(routeParams.user_id)
            .subscribe((retailerData) => {
                this.showFlashMessage('success');
                this.retailerData = retailerData;
                this.signInForm.patchValue(retailerData);
                this.cd.detectChanges();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
                    message: 'Wrong OTP',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
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
}
