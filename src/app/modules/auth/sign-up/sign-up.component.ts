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
    stateList = ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Gujarat', 'Uttar Pradesh', 'Rajasthan', 'Telangana', 'Madhya Pradesh', 'Sikkim', 'West Bengal', 'Punjab', 'Kerala', 'Haryana', 'Chandigarh (UT)', 'Puducherry (UT)', 'Goa', 'Orissa', 'Nagaland', 'Mizoram', 'Meghalaya', 'Manipur', 'Lakshadweep (UT)', 'Jharkhand', 'Jammu and Kashmir', 'Himachal Pradesh', 'Uttarakhand', 'Daman and Diu (UT)', 'Dadra and Nagar Haveli (UT)', 'Chhattisgarh', 'Bihar', 'Assam', 'Arunachal Pradesh', 'Tripura', 'Andaman and Nicobar (UT)'];
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
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    randomString(length) {
        var randomChars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(
                Math.floor(Math.random() * randomChars.length)
            );
        }
        return result;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        var domainname = this.randomString(8);
        //console.log(domainname);
        // Create the form
        this.signUpForm = this._formBuilder.group({
            name: ['', [Validators.required, Validators.pattern("^[a-zA-Z ']+")]],
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
            // company: [
            //     '',
            //     [Validators.required, Validators.pattern("^[a-z']+")],
            // ],
            domain: [domainname],
            city: [
                '',
                [
                    Validators.required,
                    Validators.pattern("^[a-zA-Z ']+"),
                ],
            ],
            state: ['', Validators.required],
            agreements: ['', Validators.requiredTrue],
        });

        $(' #confirm_password').on('keyup', function () {
            if ($('#password').val() == $('#confirm_password').val()) {
                setTimeout(function () {
                    $('#message').fadeOut('fast');
                }, 5000);
                $('#message').html('Matching').css('color', 'green');
            } else
                setTimeout(function () {
                    $('#message').fadeOut('fast');
                }, 5000);
            $('#message').html('Not Matching').css('color', 'red');

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
                        setTimeout(function () {
                            $('#emailMsg').fadeOut('fast');
                        }, 5000);
                        $('#emailMsg').html('Good to go').css('color', 'green');
                    } else {
                        setTimeout(function () {
                            $('#emailMsg').fadeOut('fast');
                        }, 5000);
                        $('#emailMsg').html("Email already present").css('color', 'red');
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
                        setTimeout(function () {
                            $('#domainMsg').fadeOut('fast');
                        }, 5000);
                        $('#domainMsg')
                            .html('Good to go')
                            .css('color', 'green');
                    } else {
                        setTimeout(function () {
                            $('#domainMsg').fadeOut('fast');
                        }, 5000);
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
        // this.signUpForm.disable();

        // Hide the alert
        // this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value).subscribe(
            (response) => {
                // Navigate to the confirmation required page
                this._router.navigateByUrl('/confirmation-required');
            },
            (response) => {
                this.ngOnInit();
                this.showFlashMessage('error');

                // Re-enable the form
                // this.signUpForm.enable();

                // // Reset the form
                // this.signUpNgForm.resetForm();

                // // Set the alert
                // this.alert = {
                //     type: 'error',
                //     message: 'Something went wrong, please try again.',
                // };

                // // Show the alert
                // this.showAlert = true;
            }
        );
    }

    goToTerms() {
        window.open('https://direct-buy.in/terms');
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
