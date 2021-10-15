import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductConfigService } from 'app/modules/admin/mobile/product-config/product-config.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';

@Component({
    selector: 'app-product-config',
    templateUrl: './product-config.component.html',
    styleUrls: ['./product-config.component.scss'],
})
export class ProductConfigComponent implements OnInit {
    isLinear = true;
    shopType: any = [];
    shopId: any;
    productSet: any;
    countProduct: any;
    data: any;
    categories: any;
    sub_category: any;
    brand: any;
    dataset: any;
    apiResponse: any = [];

    displayedColumns: string[] = [
        'shop_type',
        'category',
        'sub_category',
        'brand',
        'product_name',
        'product_type',
        'product_sub_type',
        'product_weight',
        'product_weight_type',
        'product_qty',
        'product_price',
        'offer_price',
        // 'product_img',
        // 'product_description',
    ];
    dataSource!: MatTableDataSource<any>;
    @ViewChild('paginator') paginator!: MatPaginator;
    @ViewChild(MatSort) matSort!: MatSort;

    StoreTypeSettings: IDropdownSettings;
    CategorySettings: IDropdownSettings;
    SubCategorySettings: IDropdownSettings;
    BrandSettings: IDropdownSettings;

    myOptions: IMultiSelectOption[];
    selectedItems: [];
    filterGroup: FormGroup;
    dataFilteredGroup: FormGroup;

    constructor(
        private apiService: ProductConfigService,
        private _router: Router,
        private routes: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        this.apiService.getStoreType().subscribe((shopType) => {
            this.shopType = shopType;
            this.myOptions = shopType;
        });

        this.apiService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });

        this.apiService.getSubCategories().subscribe((sub_category) => {
            this.sub_category = sub_category;
        });

        this.apiService.getBrand().subscribe((brand) => {
            this.brand = brand;
        });

        this.filterGroup = this.fb.group({
            shopType: ['', [Validators.required]],
            category: ['', [Validators.required]],
            sub_category: ['', [Validators.required]],
            brand: ['', [Validators.required]],
        });

        // if (!this.isMobile()) {
        //     //alert('desktop');
        //     this._router.navigate(['/product-config/' + routeParams.shopId]);
        //     // this._router.resetConfig(this.mobileRoutes);
        // }

        this.StoreTypeSettings = {
            singleSelection: false,
            idField: 'shop_type_id',
            textField: 'shop_type_name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
        };

        this.CategorySettings = {
            singleSelection: false,
            idField: 'category',
            textField: 'category',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
        };

        this.SubCategorySettings = {
            singleSelection: false,
            idField: 'sub_category',
            textField: 'sub_category',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
        };

        this.BrandSettings = {
            singleSelection: false,
            idField: 'brand',
            textField: 'brand',
            clearSearchFilter: true,
            maxHeight: 197,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,

            enableCheckAll: true,
            limitSelection: -1,
            searchPlaceholderText: 'Tìm kiếm',
            noDataAvailablePlaceholderText: 'Không có dữ liệu',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false,
            defaultOpen: false,
        };
    }

    onItemSelect(item: any) {
        console.log('onItemSelect', item);
    }

    onFilterSubmit() {
        console.log(this.filterGroup.value);
    }

    done() {
        const routeParams = this.routes.snapshot.params;
        this._router.navigate(['/mobile/product-info/' + routeParams.shopId]);
    }

    isMobile() {
        let check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk) |tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || (<any>window).opera);
        return check;
    }
}
