import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgImageSliderModule } from 'ng-image-slider';
import { CommonModule } from '@angular/common';
// import { IvyCarouselModule } from 'angular-responsive-carousel';
// import { HeaderComponent } from 'app/modules/customer/header/header.component';
// import { SliderComponent } from 'app/modules/customer/slider/slider.component';
// import { NavbarComponent } from 'app/modules/customer/navbar/navbar.component';
// import { FooterComponent } from 'app/modules/customer/footer/footer.component';
import { CustDetailsComponent } from './cust-details.component';

const CustomerDetailsRoutes: Route[] = [
    {
        path: '',
        component: CustDetailsComponent,
    },
];

@NgModule({
    declarations: [
        // HeaderComponent,
        CustDetailsComponent
        // NavbarComponent,
        // SliderComponent,
        // FooterComponent,
       
    ],
    imports: [
        RouterModule.forChild(CustomerDetailsRoutes),
        FontAwesomeModule,
        CommonModule,
        NgbModule,
        NgImageSliderModule,
        FormsModule,
        NgbCollapseModule,
        ReactiveFormsModule,
      
    ],
})
export class CustomerDetailsModule {}
