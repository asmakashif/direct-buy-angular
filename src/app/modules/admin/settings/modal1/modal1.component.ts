import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal1',
  templateUrl: './modal1.component.html',
  styleUrls: ['./modal1.component.scss']
})

export class Modal1Component implements OnInit {
  deleteAccountForm: FormGroup;

  // @ViewChild('myModal1', {static: false}) modal1: ElementRef;

  // open() {
  //   this.modal1.nativeElement.style.display = 'block';
  // }

  // close() {
  //   this.modal1.nativeElement.style.display = 'none';
  // }

  constructor(private formBuilder: FormBuilder,private routes: ActivatedRoute,) {}

  ngOnInit(): void {
      const user_id = localStorage.getItem('user_id');
      const routeParams = this.routes.snapshot.params;

      this.deleteAccountForm = this.formBuilder.group({
          id: [user_id],
          subdomain:[''],
      });
  }

  onDeleteAccount(){
    console.log(this.deleteAccountForm.value);
  }
}
