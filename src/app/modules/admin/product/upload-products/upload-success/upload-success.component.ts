import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgForm,
  FormArray,
  FormControl,
} from '@angular/forms';
import { StoreSummaryService } from 'app/modules/admin/store/store-summary/store-summary.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { UploadProductsService } from '../upload-products.service';
import { Observable } from 'rxjs';
import { interval } from 'rxjs'
import { HttpClient } from '@angular/common/http';
//import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-upload-success',
  templateUrl: './upload-success.component.html',
  styleUrls: ['./upload-success.component.scss']
})
export class UploadSuccessComponent implements OnInit {
  faStore = faStore;
  faWhatsapp = faWhatsapp;
  domainname: any;
  profileData: any;
  activeLink = 'StoreSummmary';
  data: any;
  countProduct: any;
  summaryForm: FormGroup;
  firstname: string;
  flashMessage: string;
  createDb: any;
  shop_name: any;
  shop_address: any;
  shopId: any;
  shopdata: any;
  dbcreation_status: any;
  shopCreationStatus: any;
  createShopDb: string;
  mapheaderSuccess: any;
  xlconfig: any;
  maptblheader: any;
  addForm: any;
  maptblheaderSuccess: number;

  constructor(
    private _fuseConfirmationService: FuseConfirmationService,
    private _uploadProductService: UploadProductsService,
    private formBuilder: FormBuilder,
    private apiService: StoreSummaryService,
    private _router: Router,
    private routes: ActivatedRoute,
    private cd: ChangeDetectorRef, //private cookieService: CookieService
    private _dashboardService: DashboardService,
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    //this.shop_type = JSON.parse(localStorage.getItem('dshop_type'));
    const routeParams = this.routes.snapshot.params;
    const user_id = localStorage.getItem('user_id');
    this.firstname = localStorage.getItem('firstname');
    const shopId = routeParams.shopId;

    setTimeout(() => {
      this._uploadProductService.mapTblHeaders(routeParams.shopId).subscribe((data) => {
        this._uploadProductService.getXLConfigData(routeParams.shopId).subscribe((data) => {
          this.xlconfig = data;
          this.maptblheader = this.xlconfig.maptblheader;
        });
      });
    }, 10000);

    setTimeout(() => {
      this._uploadProductService.pushMappedData(routeParams.shopId).subscribe((data) => {
        this._uploadProductService.getXLConfigData(routeParams.shopId).subscribe((data) => {
          this.xlconfig = data;
          this.maptblheader = this.xlconfig.maptblheader;
          this.addForm = JSON.parse(localStorage.getItem('headers'));
          setTimeout(() => {
            this._uploadProductService.saveXLConfigStatus(this.addForm).subscribe((data) => {
              this._uploadProductService.getXLConfigData(routeParams.shopId).subscribe((data) => {
                this.xlconfig = data;
                this.maptblheader = this.xlconfig.maptblheader;
                setTimeout(() => {
                  this._uploadProductService.saveMaptblheaderStatus(routeParams.shopId).subscribe((data) => {
                    this._uploadProductService.getXLConfigData(routeParams.shopId).subscribe((data) => {
                      this.xlconfig = data;
                      this.maptblheader = this.xlconfig.maptblheader;
                    });
                  });
                }, 20000);
              });
            });
          }, 20000);
        });
      });
    }, 20000);

    this._uploadProductService.getXLConfigData(routeParams.shopId).subscribe((data) => {
      this.xlconfig = data;
      this.maptblheader = this.xlconfig.maptblheader;
    });

    this.apiService
      .getShopDetailsById(routeParams.shopId, user_id)
      .subscribe((data: any) => {
        this.data = data;
        this.shopId = this.data.shopId;
        this.shop_name = this.data.shop_name;
        this.shop_address = this.data.shop_address;
      });

    this._dashboardService
      .getRetailerDetailsById(user_id)
      .subscribe((data) => {
        this.profileData = data;
        this.firstname = this.profileData.firstname;
        this.domainname = this.profileData.domainname;
        this.cd.detectChanges();
      });

    this.apiService
      .countStrProducts(routeParams.shopId)
      .subscribe((data: any) => {
        this.countProduct = data;
      });
  }

  complete(): void {
    const routeParams = this.routes.snapshot.params;
    const user_id = localStorage.getItem('user_id');
    this._router.navigate(['dashboard/' + routeParams.shopId + '/' + routeParams.shop_name])
  }
}

