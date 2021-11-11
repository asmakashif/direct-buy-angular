import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { CreateShopService } from 'app/modules/admin/store/create-shop/create-shop.service';

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

    /**
     * Constructor
     */
    constructor(
        private apiService: CreateShopService,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
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
            name: ['', Validators.required],
            contact: [
                '',
                [
                    Validators.required,
                    Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
                ],
            ],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            company: [
                '',
                [Validators.required, Validators.pattern("^[a-zA-Z']+")],
            ],
            // title: ['', [Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')],
            agreements: ['', Validators.requiredTrue],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
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
                this._router.navigateByUrl('/confirmation-required');
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
