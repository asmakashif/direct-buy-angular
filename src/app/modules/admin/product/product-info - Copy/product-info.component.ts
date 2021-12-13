import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfoService } from 'app/modules/admin/product/product-info/product-info.service';

declare var $: any;
@Component({
    selector: 'app-product-info',
    templateUrl: './product-info.component.html',
})
export class ProductInfoComponent implements OnInit {
    activeLink = 'ProductInformation';
    otherLink = 'StoreSummary';
    dataset: any;
    visualRow: any;
    shopId: any;
    constructor(
        private apiService: ProductInfoService,
        private _router: Router,
        private routes: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const routeParams = this.routes.snapshot.params;
        console.log(routeParams.shopId);
        this.apiService
            .getTempStrProducts(routeParams.shopId)
            .subscribe((dataset) => {
                this.dataset = dataset;
                this.shopId = routeParams.shopId;
                this.cd.detectChanges();
                console.log(this.dataset);
            });
        if (this.isMobile()) {
            //alert('mobile');
            this._router.navigate(['/product-info/' + routeParams.shopId]);
            // this._router.resetConfig(this.mobileRoutes);
        }
    }

    storeSummary(QSYWy7): void {
        const routeParams = this.routes.snapshot.params;
        console.log(routeParams.shopId);
        this._router.navigate(['/store-summary/' + QSYWy7]);
    }

    hotSettings = {
        afterChange: function (changes, src) {
            if (changes) {
                var rowThatHasBeenChanged = changes[0][0];

                var sourceRow = this.getSourceDataAtRow(rowThatHasBeenChanged),
                    visualRow = this.getDataAtRow(rowThatHasBeenChanged);
                console.log(visualRow);
                var id = visualRow[0];
                var category = visualRow[1];
                var sub_category = visualRow[2];
                var brand = visualRow[3];
                var product_name = visualRow[4];
                var product_type = visualRow[5];
                var product_sub_type = visualRow[6];
                var product_weight = visualRow[7];
                var product_weight_type = visualRow[8];
                var product_qty = visualRow[9];
                var product_price = visualRow[10];
                var offer_price = visualRow[11];
                // var productImg = visualRow[13];
                // var productDescription = visualRow[14];
                $(document).ready(function () {
                    $('#save_value').click(function () {});
                    $.ajax({
                        url: '/api/updateTempStrProduct.php',
                        method: 'POST',
                        data: {
                            id: id,
                            category: category,
                            sub_category: sub_category,
                            brand: brand,
                            product_name: product_name,
                            product_type: product_type,
                            product_sub_type: product_sub_type,
                            product_weight: product_weight,
                            product_weight_type: product_weight_type,
                            product_qty: product_qty,
                            product_price: product_price,
                            offer_price: offer_price,
                        },
                        success: function (data) {
                            console.log(data);
                            alert('success');
                        },
                    });
                });
            }
        },
    };

    colHeaders = [
        'Id',
        'Category',
        'Sub-Category',
        'Brand',
        'Product Name',
        'Product Type',
        'Product Sub-Type',
        'Product Weight',
        'Product Weight-Type',
        'Product Qty',
        'Product Price',
        'Offer Price',
    ];
    hiddenColumns = {
        columns: [0],
        indicators: false,
    };
    licenseKey = 'non-commercial-and-evaluation';

    nextStep() {
        const routeParams = this.routes.snapshot.params;
        var storeId = routeParams.shopId;

        $(document).ready(function () {
            $('#nextStep').click(function () {
                var base_url = window.location.origin;
                window.location.href = base_url + '/steps/' + storeId;
            });
        });
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
