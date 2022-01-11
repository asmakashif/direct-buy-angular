import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { CreateShopService } from 'app/modules/admin/store/create-shop/create-shop.service';

declare var $: any;

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    checkEmail: any;
    email: any;
    value: any;
    desc = '';
    state = '';
    stateList = ['Karnataka', 'Tamilnadu', 'Hyderabad', 'Mumbai'];
    flashMessage: string;
    /**
     * Constructor
     */
    constructor(
        private apiService: CreateShopService,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private cd: ChangeDetectorRef
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            contact: [
                '',
                [Validators.required, Validators.pattern('^[0-9]{10}$')],
            ],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                    ),
                ],
            ],
            //password: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirm_password: ['', Validators.required],
            company: [
                '',
                [Validators.required, Validators.pattern("^[a-zA-Z']+")],
            ],
            domain: [''],
            city: [
                '',
                [
                    Validators.required,
                    Validators.pattern("^[a-zA-Z']+"),
                    Validators.minLength(4),
                ],
            ],
            state: ['', Validators.required],
            agreements: ['', Validators.requiredTrue],
        });

        $(' #confirm_password').on('keyup', function () {
            if ($('#password').val() == $('#confirm_password').val()) {
                $('#message').html('Matching').css('color', 'green');
            } else $('#message').html('Not Matching').css('color', 'red');

            $('#submit').removeAttr('disabled', 'disabled');
        });

        $(' #email').on('keyup', function () {
            var email = $('#email').val();
            $.ajax({
                url: '/api/checkEmail.php/',
                method: 'POST',
                data: { email: email },
                success: function (data) {
                    if (data == 0) {
                        $('#emailMsg').html('Good to go').css('color', 'green');
                    } else {
                        $('#emailMsg')
                            .html('Email already present')
                            .css('color', 'red');
                    }
                },
            });
        });

        $(' #company-confirm').on('keyup', function () {
            var domainname = $('#company-confirm').val();
            $.ajax({
                url: '/api/checkDomain.php/',
                method: 'POST',
                data: { domainname: domainname },
                success: function (data) {
                    if (data == 0) {
                        $('#domainMsg')
                            .html('Good to go')
                            .css('color', 'green');
                    } else {
                        $('#domainMsg')
                            .html('Domain already present')
                            .css('color', 'red');
                    }
                },
            });
        });
    }

    // keyup(event) {
    //     this._authService.checkOtpVerification(event).subscribe((data) => {
    //         this.checkEmail = data;
    //         this.email = this.checkEmail.email;
    //         // if (this.email == '') {
    //         //     alert('proceed');
    //         // } else {
    //         //     alert('present');
    //         // }
    //         console.log(this.email);
    //     });
    // }

    onChange(value) {
        this.value = value;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        console.log(this.signUpForm.value);
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value).subscribe(
            (response) => {
                // Navigate to the confirmation required page
                this._router.navigateByUrl('/confirmation-required');
            },
            (response) => {
                this.showFlashMessage('error');
                this.ngOnInit();
                // Re-enable the form
                this.signUpForm.enable();

                // Reset the form
                this.signUpNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Something went wrong, please try again.',
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

    // onSubmit() {
    //     //more code
    //     console.log(this.signUpForm.value);

    //     if (this.signUpForm.invalid) {
    //         return;
    //     }

    //     //alert('desktop');
    //     this.apiService.signup(this.signUpForm.value).subscribe((data) => {
    //         // this.router.navigate(['/product-config/' + shopId]);
    //         this._router.navigate(['/sign-in/']);
    //     });
    // }
}
