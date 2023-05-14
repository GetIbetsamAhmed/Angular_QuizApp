import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ActionEvent } from 'src/app/interfaces/admin.interface';
import { modalConfig } from 'src/app/interfaces/common';
import { AdminService } from 'src/app/services/admin.service';
import { DialogService } from 'src/app/services/dialog.config.service';

const HEADER_DATA: any[] = [
  {name:'Name', key:'name'},
  {name:'Address', key:'address'}
]

@Component({
  selector: 'app-schools-list',
  templateUrl: './schools-list.component.html',
  styleUrls: ['./schools-list.component.css']
})

export class SchoolsListComponent implements OnInit{

  editForm: FormGroup=new FormGroup({
    name: new FormControl(''),
    address: new FormControl('')
  })
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;
  columns: any[] = HEADER_DATA;
  actionEvent:ActionEvent;
  data: any = null;
  modalRef: BsModalRef;
  isAddModel: boolean=true;

  constructor(private modalService: BsModalService,private toastr: ToastrService, private adminService : AdminService){}
  ngOnInit(){
    this.getSchoolsList();
  }
  getSchoolsList(){
    this.adminService.get('schools').subscribe({
      next:(response)=>{
        this.data = response;
      }
    })
  }
  openFormModal() {
    this.modalRef = this.modalService.show(this.updateTemplate,modalConfig);
  }

  actionEvents(event:ActionEvent){
    this.actionEvent=event;
    if(event.type==='edit'){
      this.openEditModel()
    }
    else if(event.type==='delete'){
    this.openDeleteModel()
    }
  }

  openDeleteModel(){
    this.modalRef = this.modalService.show(this.deleteTemplate,modalConfig);
  }

  openEditModel(){
    this.isAddModel=false
    this.editForm.get('name')?.setValue(this.actionEvent?.data?.name);
    this.editForm.get('address')?.setValue(this.actionEvent?.data?.address);

    this.modalRef = this.modalService.show(this.updateTemplate,modalConfig);
  }


  editSchoolList(){
    let url="schools/"+this.actionEvent.data.id;
    this.adminService.put(url,this.editForm.value).subscribe(response=>{
      let index=this.data.findIndex((x:any)=>x.id===this.actionEvent.data.id);
      this.data[index]={...response};
      this.data=structuredClone(this.data)
         if(response){
           this.toastr.success('success', 'Updated Successfully!');
           this.modalRef.hide();
         }
     });
  }

  createSchoolList(){
       this.adminService.post('schools',this.editForm.value).subscribe(response=>{
      if(response){
        this.data.push(response);
        this.toastr.success('success', 'Added Successfully!');
        this.data=structuredClone(this.data);
        this.modalRef.hide();
        this.editForm.reset();
    }
    });
  }
  deleteSchoolList(){
    let url=`schools/${this.actionEvent.data.id}`
    this.adminService.delete(url).subscribe(response=>{
      this.data=this.data.filter((x:any)=>x.id!==this.actionEvent.data.id);
      this.data=structuredClone(this.data);
      if (response) {
        this.toastr.success('success', 'Deleted Successfully!');
        this.modalRef.hide();
      }
    });
  }



  confirmEvent(){
    if(this.actionEvent===null || this.actionEvent===undefined){
      this.createSchoolList();
    }
    else if(this.actionEvent && this.actionEvent.type==='edit'){
    this.editSchoolList();
    }
    else if(this.actionEvent && this.actionEvent.type==='delete'){
      this.deleteSchoolList();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.actionEvent=null as any;
  }
}
