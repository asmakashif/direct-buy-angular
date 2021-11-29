import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
    NgForm,
} from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { CreateShopService } from 'app/modules/admin/store/create-shop/create-shop.service';

declare var $: any;
@Component({
    selector: 'app-create-shop',
    templateUrl: './create-shop.component.html',
    //styleUrls: ['./create-shop.component.css'],
})
export class CreateShopComponent implements OnInit {
    @ViewChild('shopForm') shopForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    shopType: any;
    flashMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private apiService: CreateShopService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {}
    addForm: FormGroup;

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

    ngOnInit(): void {
        const user_id = localStorage.getItem('user_id');
        var shop_id = this.randomString(6);

        // this.apiService.getStoreTypes().subscribe((shopType) => {
        //     this.shopType = shopType;
        // });

        this.addForm = this.formBuilder.group({
            id: [],
            user_id: [user_id],
            shopId: [shop_id],
            shop_name: ['', Validators.required],
            shop_address: ['', Validators.required],
            //shopType: this.formBuilder.array([], [Validators.required]),
        });

        //this.validateShop();
    }

    validateShop() {
        $('#shop_name').on('keyup', function () {
            var shop_name = $('#shop_name').val();
            if (shop_name != '') {
                $.ajax({
                    url: 'api/fetchShopByName.php',
                    method: 'POST',
                    data: { shop_name: shop_name },
                    success: function (data) {
                        var obj = JSON.parse(data);
                        //console.log(obj);
                        if (obj == '') {
                            //console.log('proceed');
                            $('#message')
                                .html('Good to go')
                                .css('color', 'green');
                        } else {
                            //console.log('present');
                            $('#message')
                                .html('Shop already present')
                                .css('color', 'red');
                            $('#checkBtn').removeAttr('disabled', 'disabled');
                        }
                    },
                });
            }
        });
    }

    onCheckboxChange(e) {
        const shopType: FormArray = this.addForm.get('shopType') as FormArray;

        if (e.target.checked) {
            shopType.push(new FormControl(e.target.value));
        } else {
            const index = shopType.controls.findIndex(
                (x) => x.value === e.target.value
            );
            shopType.removeAt(index);
        }
    }

    onSubmit() {
        //more code
        console.log(this.addForm.value);
        var shopId = this.addForm.value.shopId;
        if (this.addForm.invalid) {
            return;
        }
        if (!this.isMobile()) {
            //alert('desktop');
            this.apiService.createUser(this.addForm.value).subscribe(
                () => {
                    // this.router.navigate(['/product-config/' + shopId]);
                    this.showFlashMessage('success');
                    this.router.navigate(['/steps/' + shopId]);
                },
                (response) => {
                    this.showFlashMessage('error');
                    this.ngOnInit();
                    // Reset the form
                    //this.shopForm.resetForm();
                }
            );
        } else {
            this.apiService.createUser(this.addForm.value).subscribe(
                () => {
                    // this.router.navigate(['/product-config/' + shopId]);
                    this.router.navigate(['/mobile/steps/' + shopId]);
                },
                (response) => {
                    this.showFlashMessage('error');
                    this.ngOnInit();
                    // Reset the form
                    //this.shopForm.resetForm();
                }
            );
        }
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
