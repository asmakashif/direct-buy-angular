import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CreateShopService } from 'app/modules/admin/store/create-shop/create-shop.service';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UploadProductsService } from '../upload-products.service';

declare var $: any;
type AOA = any[][];
@Component({
  selector: 'app-map-table-headers',
  templateUrl: './map-table-headers.component.html',
  styleUrls: ['./map-table-headers.component.scss']
})
export class MapTableHeadersComponent implements OnInit {
  faStore = faStore;
  faWhatsapp = faWhatsapp;
  domainname: any;
  profileData: any;

  firstname: any;
  addForm: FormGroup;
  flashMessage: string;

  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  data: AOA = [[1, 2], [3, 4]];
  isExcelFile: boolean;
  excelHeader: any;
  exceldata: unknown[];
  xlForm: FormGroup;
  tblColName: any;

  constructor(
    private formBuilder: FormBuilder,
    private _uploadProductService: UploadProductsService,
    private _router: Router,
    private cd: ChangeDetectorRef,
    private _dashboardService: DashboardService,
    private routes: ActivatedRoute,
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    const routeParams = this.routes.snapshot.params;
    const user_id = localStorage.getItem('user_id');

    this.addForm = this.formBuilder.group({
      product_name: [''],
      product_brand: [''],
      sku: [''],
      product_type: [''],
      product_sub_type: [''],
      product_category: [''],
      product_subcategory: [''],
      product_weight: [''],
      product_weight_type: [''],
      product_price: [''],
      product_offer_price: [''],
      product_stock: [''],
    });

    this.xlForm = this.formBuilder.group({
      shopId: [routeParams.shopId],
      xl_file_name: ['']
    })
    this._dashboardService
      .getRetailerDetailsById(user_id)
      .subscribe((data) => {
        this.profileData = data;
        this.firstname = this.profileData.firstname;
        this.domainname = this.profileData.domainname;
        this.cd.detectChanges();
      });

    this._uploadProductService
      .readXLColFrmDB(routeParams.shopId)
      .subscribe((colName) => {
        this.tblColName = colName;
        console.log(this.tblColName);
      });
  }

  onSubmit() {
    //more code
    console.log(this.addForm.value);
    // this._dashboardService.savePlayerId().subscribe((data) => {
    //     this.cd.markForCheck();
    // });
  }

  onXLChange(evt) {
    let data, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.XLS)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.ngOnInit;
      this.spinnerEnabled = true;
      const file = evt.target.files[0];

      this.xlForm.get('xl_file_name').setValue(file);
      const formData = new FormData();
      formData.append(
        'shopId',
        this.xlForm.get('shopId').value
      );
      formData.append(
        'myFile',
        this.xlForm.get('xl_file_name').value
      );
      this._httpClient
        .post<any>('/api/products/uploadXL.php', formData)
        .subscribe(() => {
          const routeParams = this.routes.snapshot.params;
          this._router.navigate([
            '/read-xl-data/' + routeParams.shopId + '/' + routeParams.shop_name,
          ]);
        });
    }

  }

  onChange(evt) {

    JSON.stringify(localStorage.removeItem('excelHeader'));
    let data, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.XLS)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.ngOnInit;
      this.spinnerEnabled = true;


      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        // data = XLSX.utils.sheet_to_json(ws);
        // this.exceldata = XLSX.utils.sheet_to_json(ws);
        // console.log(data);
        // this.keys = Object.keys(data[0]);
        // console.log(this.keys);
        // var excelHeader = this.keys;
        // localStorage.setItem('excelHeader', JSON.stringify(excelHeader));
        // this.excelHeader = JSON.parse(localStorage.getItem('excelHeader'));
        // console.log(this.keys);
        // console.log(this.keys[0]);
        // console.log(this.keys[1]);

        this.exceldata = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        this.exceldata.map(res => {
          // console.log(res);
        })
        //data = XLSX.utils.sheet_to_json(ws);
        data = <AOA>(XLSX.utils.sheet_to_json(ws));
        this.keys = Object.keys(data[0]);

        this.keys.map(res => {
          //console.log(res);
        })
        var excelHeader = this.keys;
        localStorage.setItem('excelHeader', JSON.stringify(excelHeader));
        var excelCol = JSON.parse(localStorage.getItem('excelHeader'));
        this.excelHeader = JSON.parse(localStorage.getItem('excelHeader'));
        // this.excelHeader = [
        //     { columnName: excelCol[0] },
        //     { columnName: excelCol[1] },
        //     { columnName: excelCol[2] }
        // ];

      };

      reader.readAsBinaryString(target.files[0]);
      reader.onloadend = (e) => {
        this.ngOnInit;
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data)
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }

  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
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

  storeDashboard(): void {
    const routeParams = this.routes.snapshot.params;
    this._router.navigate([
      '/dashboard/' + routeParams.shopId + '/' + routeParams.shop_name,
    ]);
  }
}

