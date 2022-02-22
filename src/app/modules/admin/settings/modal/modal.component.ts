// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.scss']
// })
// export class ModalComponent implements OnInit {

//   @ViewChild('myModal', {static: false}) modal: ElementRef;

//   open() {
//     this.modal.nativeElement.style.display = 'block';
//   }

//   close() {
//     this.modal.nativeElement.style.display = 'none';
//   }

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal1Component } from '../modal1/modal1.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  // template: `
  //   <div #myModal class="container">
  //   <div class="content">
  //     <p>Some content here...</p>
  //     <form [formGroup]="deleteAccountForm" autocomplete="off">
  //       <mat-form-field class="w-full">
  //       <mat-label
  //           >Domain Name</mat-label
  //       >

  //       <input
  //           matInput
  //           [formControlName]="
  //               'subdomain'
  //           "
  //           placeholder="text"
  //       />
  //   </mat-form-field>
  //   <button
  //                               mat-flat-button
  //                               [color]="'primary'"
  //                               (click)="onDeleteAccount()"
  //                           >
  //                               Update
  //                           </button>
  //   </form>
  //     <button (click)="close()">Close</button>
  //   </div>
  //   </div>
  // `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  deleteAccountForm: FormGroup;

  @ViewChild('myModal', {static: false}) modal: ElementRef;

  //@ViewChild('modal1', { static: false }) modal1: Modal1Component;

  // openModal1() {
  //   this.modal1.open();
  // }

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

  constructor(private formBuilder: FormBuilder,private routes: ActivatedRoute,
    private _router: Router,) {}

  ngOnInit(): void {
      const user_id = localStorage.getItem('user_id');
      const routeParams = this.routes.snapshot.params;

      this.deleteAccountForm = this.formBuilder.group({
          id: [user_id],
          subdomain:[''],
      });
  }

  deleteAccount(){
    this._router.navigate(['confirm-deletion/']);
  }
}
