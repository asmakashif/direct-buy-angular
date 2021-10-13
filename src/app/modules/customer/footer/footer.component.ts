import { Component, OnInit } from '@angular/core';
import { faArrowRight,faCircle ,faCaretRight} from '@fortawesome/free-solid-svg-icons';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  faArrowRight=faArrowRight;
  faCircle = faCircle;
  faCaretRight=faCaretRight;
  faShippingFast=faShippingFast;
  faSave=faSave;
  faHeadset=faHeadset;
  faEnvelope=faEnvelope;
  faEnvelopeOpenText=faEnvelopeOpenText;


  constructor() { }

  ngOnInit(): void {
  }

}
