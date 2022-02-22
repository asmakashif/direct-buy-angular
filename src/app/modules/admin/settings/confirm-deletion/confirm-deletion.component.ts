import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DashboardService } from '../../dashboard/dashboard.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent {
  faStore = faStore;
  faWhatsapp = faWhatsapp;
  selectedProject: string = 'Settings';
  imagePath: string = '/api/products/uploads/';
  profileData: any;
  firstname: any;
  domainname: any;
  deleteAccountForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _settingService: SettingsService,
    private _dashboardService: DashboardService,
    private _router: Router,
    private routes: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private _httpClient: HttpClient,) { }

  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id');
    const routeParams = this.routes.snapshot.params;
    this._settingService
      .getRetailerDetailsById(user_id)
      .subscribe((data) => {
        this.profileData = data;
        this.firstname = this.profileData.firstname;
        this.domainname = this.profileData.domainname;
        this.cd.detectChanges();
      });

    this.deleteAccountForm = this.formBuilder.group({
      id: [user_id],
      subdomain: [''],
    });
  }

  dashbaord(): void {
    this._router.navigate(['dashboard/']);
  }

  onDeleteAccount() {
    console.log(this.deleteAccountForm.value.subdomain);
    const id = this.deleteAccountForm.value.id;
    const subdomain = this.deleteAccountForm.value.subdomain;
    this._settingService
      .accountDeletion(this.deleteAccountForm.value)
      .subscribe((data) => {
        this._settingService
          .subDomainDeletion(id, subdomain)
          .subscribe((data) => {
            console.log(data)
            if (data.message == 1) {
              const confirmation = this._fuseConfirmationService.open({
                title: 'Account Closure',
                message:
                  'We are sad to see you go, however we respect your decision, and hope to do business with you again. If you have any suggestions to improve our services, please do write to suggestions@direct-buy.in.<br>deletion in progress......<br><span class="font-bold">Once your account is closed, you will be logged out.</span>',
                icon: {
                  show: false,
                  color: 'warn',
                },
                "actions": {
                  "confirm": {
                    "show": true,
                    "label": "okay",
                  },
                  "cancel": {
                    "show": false,
                    "label": "Cancel"
                  }
                },
              });
              confirmation.afterClosed().subscribe((result) => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                  this._router.navigate(['/sign-out']);
                }
              });
            }
            else {
              const confirmation = this._fuseConfirmationService.open({
                title: 'Account Closure',
                message:
                  'Account name mismatch',
                icon: {
                  show: false,
                  color: 'warn',
                },
                "actions": {
                  "confirm": {
                    "show": true,
                    "label": "Okay",
                  },
                  "cancel": {
                    "show": false,
                    "label": "Cancel"
                  }
                },
              });
            }
          });
      });
  }

  cancelDeletion() {
    this._router.navigate(['/settings']);
  }

}
