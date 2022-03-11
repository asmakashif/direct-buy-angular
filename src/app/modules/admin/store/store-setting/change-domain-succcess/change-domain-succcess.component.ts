import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { Data } from 'app/Model/data';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { StoreService } from '../../store.service';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-change-domain-succcess',
  templateUrl: './change-domain-succcess.component.html',
  styleUrls: ['./change-domain-succcess.component.scss']
})
export class ChangeDomainSucccessComponent implements OnInit {
  faStore = faStore;
  faWhatsapp = faWhatsapp;
  domainname: any;
  profileData: any;
  shops: any;
  firstname: any;
  value: any;
  desc = '';
  changeDomainForm: any;
  flashMessage: string;
  mobile: boolean;
  success: any;
  successMsg: any;
  successMsgMob: boolean;
  subdomain: string;
  keyup: string;
  constructor(
    private _dashboardService: DashboardService,
    private _storeService: StoreService,
    private _router: Router,
    private routes: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.mobile = this.isMobile();
    const user_id = localStorage.getItem('user_id');
    this._dashboardService
      .getRetailerDetailsById(user_id)
      .subscribe((data) => {
        this.changeDomainForm.patchValue(data);
        this.profileData = data;
        this.firstname = this.profileData.firstname;
        this.domainname = this.profileData.domainname;
        this.cd.detectChanges();
      });
    this.changeDomainForm = this._formBuilder.group({
      user_id: [user_id],
      domainname: [
        '',
        [Validators.required, Validators.pattern("^[a-z']+")],
      ],
    });

    $(' #domainname').on('keyup', function () {
      var domainname = $('#domainname').val();
      $.ajax({
        url: '/api/checkDomain.php/',
        method: 'POST',
        data: { domainname: domainname },
        success: function (data) {
          if (data == 0) {
            $('#domainMsg')
              .html('Good to go')
              .css('color', 'green');
          } else {
            $('#domainMsg')
              .html('Domain already present')
              .css('color', 'red');
          }
        },
      });
    });
  }

  // changeDomain(e) {
  //   var x = document.getElementById("section1");
  //   var y = document.getElementById("section2");
  //   if (x.style.display === "none") {
  //     x.style.display = "none";
  //     y.style.display = "block";
  //   } else {
  //     x.style.display = "block";
  //     y.style.display = "none";
  //   }
  // }

  changeDomain(e) {
    var x = document.getElementById("section2");
    var y = document.getElementById("section1");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
      y.style.display = "block";
    }
  }

  onChange(value) {
    const onKeyUp = 'onKeyUp';
    localStorage.setItem('onKeyUp', onKeyUp);
    this.keyup = localStorage.getItem('onKeyUp');
    this.value = value;
  }

  changeSubDomain(): void {
    localStorage.removeItem('onKeyUp');
    const changeSubDomain = 'changeSubDomain';
    localStorage.setItem('changeSubDomain', changeSubDomain);
    this.subdomain = localStorage.getItem('changeSubDomain');
    console.log(this.changeDomainForm.value.domainname);
    var domainname = this.changeDomainForm.value.domainname;
    var user_id = this.changeDomainForm.value.user_id;


    this._storeService.changeSubDomain(domainname, user_id).subscribe(
      (data) => {
        this.success = data;
        if (this.success.message == 'Success') {
          this.ngOnInit();
          this.successMsg = true;
          localStorage.removeItem('changeSubDomain');
        }
        else {
          this.successMsg = false;
        }
        this.showFlashMessage('success');
      },
      (response) => {
        this.showFlashMessage('error');
        this.ngOnInit();
        // Reset the form
        //this.shopForm.resetForm();
      }
    );
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


