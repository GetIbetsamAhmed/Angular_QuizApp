import { Component, ViewChild, Output, EventEmitter, SimpleChanges, Input, OnInit, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActionEvent } from 'src/app/interfaces/admin.interface';
import { MatSort } from '@angular/material/sort';


interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit,OnChanges {
  @Input() columns: any[];
  @Input() inputData: any;
  @Input() inputExtra: any;
  displayedColumns: string[]
  dataSource: any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSourceOne: MatTableDataSource<PeriodicElement>;
  displayedColumnsOne: string[];
  @Output() actionEvent:EventEmitter<ActionEvent>=new EventEmitter();
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @Input() title:string='';
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes){
      this.inputData=changes?.['inputData']?.currentValue;
      this.dataSourceOne.data = this.inputData;
      this.dataSourceOne.sort = this.empTbSort;

    }
  }
  constructor( ) {
    this.dataSourceOne = new MatTableDataSource;
  }

  ngOnInit(){
    this.dataSourceOne.data = this.inputData;
    this.displayedColumnsOne = this.columns.map(column => column.key);
    this.displayedColumnsOne.push('action')
  }

  updateRowData(id:any){
    this.inputExtra.updateRowData(id)
  }



  ngAfterViewInit() {
    this.dataSourceOne.paginator = this.paginator;
    this.dataSourceOne.sort = this.empTbSort;

  }


 editItem(item: any,index:number) {
  this.actionEvent.emit({type:'edit',data:item,index:index})
 }

 deleteItem(item: any,index:number) {
  this.actionEvent.emit({type:'delete',data:item,index:index})
 }


}
