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
import { SearchPageComponent } from './search-page.component';

const SearchPageRoutes: Route[] = [
    {
        path: '',
        component: SearchPageComponent,
    },
];

@NgModule({
    declarations: [
        // HeaderComponent,
        SearchPageComponent
        // NavbarComponent,
        // SliderComponent,
        // FooterComponent,
       
    ],
    imports: [
        RouterModule.forChild(SearchPageRoutes),
        FontAwesomeModule,
        CommonModule,
        NgbModule,
        NgImageSliderModule,
        FormsModule,
        NgbCollapseModule,
        ReactiveFormsModule,
      
    ],
})
export class SearchPageModule {}
