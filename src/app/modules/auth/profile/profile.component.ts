import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'app/modules/auth/profile/profile.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    profileData: any;
    constructor(
        private flashMessagesService: FlashMessagesService,
        private formBuilder: FormBuilder,
        private apiService: ProfileService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        const user_id = localStorage.getItem('user_id');
        this.profileForm = this.formBuilder.group({
            id: [user_id],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            domainname: ['', Validators.required],
            contact: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            address: ['', Validators.required],
            logo: ['', Validators.required],
        });
        this.apiService.getRetailerDetailsById(user_id).subscribe((data) => {
            this.profileForm.patchValue(data);
            this.profileData = data;
            console.log(this.profileData);
        });
    }

    editProfile() {
        console.log('keyup');
        $(document).ready(function () {
            $('#firstname').prop('readonly', false);
            $('#lastname').prop('readonly', false);
            $('#address').prop('readonly', false);
            $('#logo').prop('disabled', false);
            $('#editProfileBtn').prop('disabled', false);
            // $('#editProfile').replaceWith(
            //     `<button class="btn btn-success" value="submit">Update</button>`
            // );
        });
    }

    onUpdate() {
        console.log(this.profileForm.value);
        this.apiService
            .updateRetailerDetails(this.profileForm.value)
            .subscribe((data) => {
                this.flashMessagesService.show(
                    // Array of messages each will be displayed in new line
                    'Updated Successfully',
                    {
                        cssClass: 'alert-success', // Type of flash message, it defaults to info and success, warning, danger types can also be used
                        timeout: 4000, // Time after which the flash disappears defaults to 4000ms
                    }
                );
                //this.ngOnInit();
                this._router.navigate(['profile/']).then(() => {
                    window.location.reload();
                });
            });
    }
}
