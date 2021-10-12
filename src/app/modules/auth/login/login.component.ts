import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { SignInService } from 'app/modules/auth/sign-in/sign-in.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    loginForm: FormGroup;
    showAlert: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _apiService: SignInService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [''],
        });
    }

    signIn(): void {
        // Return if the form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // Disable the form
        this.loginForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._apiService.signIn(this.loginForm.value).subscribe(
            () => {
                // const redirectURL =
                //     this._activatedRoute.snapshot.queryParamMap.get(
                //         'redirectURL'
                //     ) || '/signed-in-redirect';

                // Navigate to the redirect url
                // this._router.navigateByUrl(redirectURL);
                this._router.navigate(['/dashboard/']);
            },
            (response) => {
                // Re-enable the form
                this.loginForm.enable();

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
}
