import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgImageSliderModule } from 'ng-image-slider';
// import { IvyCarouselModule } from 'angular-responsive-carousel';
import { HeaderComponent } from 'app/modules/customer/header/header.component';
import { HomeComponent } from 'app/modules/customer/home/home.component';
import { SliderComponent } from 'app/modules/customer/slider/slider.component';
import { NavbarComponent } from 'app/modules/customer/navbar/navbar.component';
import { FooterComponent } from 'app/modules/customer/footer/footer.component';

const homeRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent,
    },
];

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        NavbarComponent,
        SliderComponent,
        FooterComponent,
       
    ],
    imports: [
        RouterModule.forChild(homeRoutes),
        FontAwesomeModule,
        // IvyCarouselModule,
        NgbModule,
        NgImageSliderModule,
        FormsModule,
        NgbCollapseModule,
    ],
})
export class HomeModule {}
