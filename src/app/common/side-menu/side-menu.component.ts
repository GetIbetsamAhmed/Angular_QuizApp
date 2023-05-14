import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  @Input() isExpanded:boolean=true;
  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.isExpanded =changes?.['isExpanded']?.currentValue;
  }
  ngOnInit() {
  }
  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

}
