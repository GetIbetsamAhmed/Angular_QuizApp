import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-template',
  templateUrl: './teacher-template.component.html',
  styleUrls: ['./teacher-template.component.css']
})
export class TeacherTemplateComponent {
  @Input() isExpanded: boolean = true;

  headerEvent(event:boolean){
    this.isExpanded = event;
  }


}
