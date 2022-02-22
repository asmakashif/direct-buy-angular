import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: [ './my-modal.component.css' ]
})

export class MyModalComponent{
  @Input() oldname = "";

  @Output() close = new EventEmitter<string>();
  newname = "";

  ngOnInit() {
      // copy all inputs to avoid polluting them
      this.newname = this.oldname; 
  }

  ok() {
      this.close.emit(this.newname);
  }

  cancel() {
      this.close.emit(null);
  }
}