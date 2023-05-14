import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; 
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ActionEvent } from 'src/app/interfaces/admin.interface';
import { modalConfig } from 'src/app/interfaces/common';
import { AdminService } from 'src/app/services/admin.service'; 

const HEADER_DATA: any[] = [ 
  {name:'User Name', key:'username'},
  {name:'Email Address', key:'email'},
  {name:'School Name', key:'school_name'},
]

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit{

  teachersListForm: FormGroup=new FormGroup({
    school_name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl('')
  })
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('updateTemplate') updateTemplate: TemplateRef<any>;
  columns: any[] = HEADER_DATA;
  actionEvent:ActionEvent;
  data: any = null;
  modalRef: BsModalRef;
  isAddModel: boolean=true;
  teacherData: any[];
  schoolsList: any[]; 
  selectedSchool = '';
  

  constructor(private modalService: BsModalService,private toastr: ToastrService, private adminService : AdminService){}
  
  ngOnInit(){
    this.getTeachersList();
    this.getSchoolsList(); 
  }
  getTeachersList(){ 
      this.adminService.get('teachers').subscribe({
        next:(response)=>{
          let teacherDataArray = [];
          this.teacherData = response;
          for (let i = 0; i < this.teacherData.length; i++) {
            let teacherObj;
            teacherObj = {
              email: this.teacherData[i].email,
              username: this.teacherData[i].username,
              school_name: this.teacherData[i].school_name,
              id:this.teacherData[i].id,
              password:this.teacherData[i].password,
              confirm_password:this.teacherData[i].confirm_password,
            };
            teacherDataArray.push(teacherObj);
          this.data = teacherDataArray;
        }
      }
      }) 
  }
  getSchoolsList(){
    this.adminService.get('schools').subscribe(response => {
      this.schoolsList = response;
    });
  }
  openFormModal() {
    this.modalRef = this.modalService.show(this.updateTemplate,modalConfig);
  }

  actionEvents(event:ActionEvent){
    this.actionEvent = event;
    if(event.type==='edit'){
      this.openEditModel()
    }
    else if(event.type==='delete'){
    this.openDeleteModel()
    }
  }
  openEditModel(){
    this.isAddModel=false 
    this.teachersListForm.get('username')?.setValue(this.actionEvent?.data?.username);
    this.teachersListForm.get('email')?.setValue(this.actionEvent?.data?.email); 
    this.teachersListForm.get('school_name')?.setValue(this.actionEvent?.data?.selectedSchool);
    this.teachersListForm.get('password')?.setValue(this.actionEvent?.data?.password);
    this.modalRef = this.modalService.show(this.updateTemplate,modalConfig);
  }
  openDeleteModel(){
    this.modalRef = this.modalService.show(this.deleteTemplate,modalConfig);
  }
  confirmEvent(){
    if(this.actionEvent===null || this.actionEvent===undefined){
      this.createTeachersList();
    }
    else if(this.actionEvent && this.actionEvent.type==='edit'){
    this.updateTeachersList();
    }
    else if(this.actionEvent && this.actionEvent.type==='delete'){
      this.deleteTeachersList();
    }
  }
  createTeachersList(){
    this.teachersListForm.value.school_name = this.selectedSchool; 
      this.adminService.post('teachers',this.teachersListForm.value).subscribe(response=>{
     if(response){
       this.data.push(response);
       this.toastr.success('success', 'Added Successfully!');
       this.data = structuredClone(this.data);
       this.modalRef.hide();
       this.teachersListForm.reset();
   }
   });
  }
  updateTeachersList(){
    this.teachersListForm.value.school_name = this.selectedSchool;
    let url="teachers/"+this.actionEvent.data.id;
    this.adminService.put(url,this.teachersListForm.value).subscribe(response=>{
      let index=this.data.findIndex((x:any)=>x.id===this.actionEvent.data.id);
      this.data[index]={...response};
      this.data=structuredClone(this.data)
         if(response){
            this.getTeachersList();
           this.toastr.success('success', 'Updated Successfully!');
           this.modalRef.hide();
         }
     });
  }
  deleteTeachersList(){
    let url=`teachers/${this.actionEvent.data.id}`
    this.adminService.delete(url).subscribe(response=>{
      this.data=this.data.filter((x:any)=>x.id!==this.actionEvent.data.id);
      this.data=structuredClone(this.data);
      if (response) {
        this.toastr.success('success', 'Deleted Successfully!');
        this.modalRef.hide();
      }
    });
  }
  ngOnDestroy(): void {
    this.actionEvent=null as any;
  }
 
  selectSchool(value: any) {
    this.selectedSchool = value.target.value;
    }
  }
