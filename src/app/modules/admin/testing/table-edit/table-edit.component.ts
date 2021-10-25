import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import {
    GenericTableComponent,
    GtConfig,
    GtInformation,
    GtOptions,
    GtRow,
} from '@angular-generic-table/core';
import { ProductInfoService } from 'app/modules/admin/mobile/product-info/product-info.service';
import { ActivatedRoute } from '@angular/router';

export interface RowData extends GtRow {
    temp_str_config_id: number;
    category: string;
    sub_category: string;
}

@Component({
    selector: 'app-table-edit',
    templateUrl: './table-edit.component.html',
    styleUrls: ['./table-edit.component.scss'],
})
export class TableEditComponent {
    public data: Array<RowData> = [];
    public configObject: GtConfig<RowData>;
    public inlineEditState = true;
    public $inlineEdit: ReplaySubject<boolean> = new ReplaySubject(1);

    @ViewChild(GenericTableComponent)
    private myTable: GenericTableComponent<RowData, any>;

    updatedRow: {
        newValue: RowData;
        oldValue: RowData;
        originalValue: RowData;
    };

    constructor(
        private http: HttpClient,
        private apiService: ProductInfoService,
        private routes: ActivatedRoute
    ) {
        this.$inlineEdit.next(this.inlineEditState);
    }

    ngOnInit() {
        const routeParams = this.routes.snapshot.params;
        this.apiService
            .getTempStrProducts(routeParams.shopId)
            .subscribe((dataset) => {
                this.data = dataset;
            });
        this.configObject = {
            settings: [
                {
                    objectKey: 'temp_str_config_id',
                    // sort: 'asc',
                    // sortOrder: 1,
                    columnOrder: 0,
                },
                {
                    objectKey: 'category',
                    // sort: 'asc',
                    // sortOrder: 0,
                    columnOrder: 1,
                },
                {
                    objectKey: 'sub_category',
                    // sort: 'asc',
                    // sortOrder: 0,
                    columnOrder: 2,
                },
                {
                    objectKey: 'brand',
                    // sort: 'asc',
                    // sortOrder: 0,
                    columnOrder: 3,
                },
                {
                    objectKey: 'product_name',
                    // sort: 'asc',
                    // sortOrder: 0,
                    columnOrder: 4,
                },
                {
                    objectKey: 'product_type',
                    // sort: 'asc',
                    // sortOrder: 0,
                    columnOrder: 5,
                },
                {
                    objectKey: 'product_weight',
                    // sort: 'asc',
                    // sortOrder: 0,
                    columnOrder: 6,
                },
                {
                    objectKey: 'product_qty',
                    // sort: 'asc',
                    // sortOrder: 0,
                    columnOrder: 7,
                },
                {
                    objectKey: 'product_price',
                    // sort: 'asc',
                    // sortOrder: 0,
                    columnOrder: 8,
                },
                {
                    objectKey: 'offer_price',
                    // sort: 'asc',
                    // sortOrder: 0,
                    columnOrder: 9,
                },
                // {
                //     objectKey: 'product_description',
                //     // sort: 'asc',
                //     // sortOrder: 0,
                //     columnOrder: 10,
                // },
                // {
                //     objectKey: 'product_img',
                //     // sort: 'asc',
                //     // sortOrder: 0,
                //     columnOrder: 11,
                // },
            ],
            fields: [
                {
                    name: 'Id',
                    objectKey: 'temp_str_config_id',
                },
                {
                    name: 'Category',
                    objectKey: 'category',
                    inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                },
                {
                    name: 'SubCategory',
                    objectKey: 'sub_category',
                    inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                },
                {
                    name: 'Brand',
                    objectKey: 'brand',
                    inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                },
                {
                    name: 'ProductName',
                    objectKey: 'product_name',
                    inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                },
                {
                    name: 'ProductType',
                    objectKey: 'product_type',
                    inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                },
                {
                    name: 'ProductWeight',
                    objectKey: 'product_weight',
                    inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                },
                {
                    name: 'Qty',
                    objectKey: 'product_qty',
                    inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                },
                {
                    name: 'ProductPrice',
                    objectKey: 'product_price',
                    inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                },
                {
                    name: 'OfferPrice',
                    objectKey: 'offer_price',
                    inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                },
                // {
                //     name: 'Description',
                //     objectKey: 'product_description',
                //     inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                // },
                // {
                //     name: 'Image',
                //     objectKey: 'product_img',
                //     inlineEdit: { active: this.$inlineEdit }, // set to true, if you don't want to use observable for inline edit
                // },
            ],
        };
    }

    logData() {
        console.log(this.configObject.data);
    }

    /** Listen for events
     * */
    public trigger = function ($event) {
        //console.log($event);
        if ($event.value && $event.name === 'gt-row-updated') {
            this.updatedRow = $event.value;
            const updatedData = this.updatedRow.newValue;
            console.log(this.updatedRow.newValue);
            this.apiService
                .updateStrTempData(updatedData)
                .subscribe((data) => {});
        }
    };

    /* toggle state for inline edit */
    public toggleInlineEdit() {
        // check if table has unsaved changes...
        if (this.myTable.hasEdits) {
            // ...if so, discard changes (could be used to warn user before discarding changes)
            this.myTable.inlineEditCancel();
        }
        this.inlineEditState = !this.inlineEditState;
        this.$inlineEdit.next(this.inlineEditState);
    }
}
