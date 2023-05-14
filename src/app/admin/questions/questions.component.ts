import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActionEvent } from 'src/app/interfaces/admin.interface';
import { modalConfig } from 'src/app/interfaces/common';
import { AdminService } from 'src/app/services/admin.service';

const HEADER_DATA: any[] = [
  { name: 'Quiz Name', key: 'name' },
  // { name: 'Question Length', key: 'name' },
]

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})


export class QuestionsComponent {

  constructor(private adminService: AdminService, private modalService: BsModalService) {

  }

  columns: any[] = HEADER_DATA;
  actionEvent: ActionEvent;
  quizQuestionArr: any = [];
  allSchools: any = [];
  allQuiz: any = [];
  selectedSchool = "";
  quizName = "";
  modalRef: BsModalRef;
  isTable = true;
  personalDevelopmentAreas: any = [];

  @ViewChild('createQuiz') updateTemplate: TemplateRef<any>;

  selectSchool(value: any) {
    let schoolName = value.target.value;
    this.selectedSchool = this.allSchools.findIndex((data: any) => data.name === schoolName);
    console.log(this.selectedSchool);
  }

  selectPDA(value: any, questionID: number) {
    let pdaName = value.target.value;
    this.quizQuestionArr[questionID].pda_id = this.personalDevelopmentAreas.findIndex((data: any) => data.content === pdaName);
    console.log(this.selectedSchool);
  }

  openFormModal() {
    this.isTable = false;
  }

  closeQiuz() {
    this.quizName = "";
    this.quizQuestionArr = [];
    this.selectedSchool = "";
    this.isTable = true;
  }

  ngOnInit() {
    this.getSchoolsList();
    this.getQuizList();
    this.getPersonalDevelopmenetAreas();
  }

  getSchoolsList() {
    this.adminService.get('schools').subscribe({
      next: (response) => {
        this.allSchools = response;
      }
    })
  }

  getQuizList() {
    this.adminService.get('tests').subscribe({
      next: (response) => {
        this.allQuiz = response;
      }
    })
  }

  deleteQuestion(id: number) {
    this.quizQuestionArr.splice(id, 1);
  }

  deleteOption(questionId: number, optionId: number) {
    this.quizQuestionArr[questionId].choices.splice(optionId, 1);
  }

  validateAlert(msg: string) {
    alert(msg);
  }
  validatation() {
    let returnVal = false;
    this.quizQuestionArr.forEach((element: any) => {
      if (element.question_text === "") {
        this.validateAlert("Please Insert Question");
        returnVal = false;
      }
      else {
        returnVal = true;
      }

      element.choices.forEach((innerElement: any) => {
        if (innerElement.choice_text === "") {
          this.validateAlert("Any choice of the question remain empty");
        }
      });

    });
    return returnVal;
  }

  saveQiuz() {

    if (this.validatation()) {

      console.log(this.quizQuestionArr);
      let body = {
        name: this.quizName,
        school_id: this.selectedSchool,
        questions: this.quizQuestionArr
      };

      // let test = {
      //   "name": "string",
      //   "school_id": 0,
      //   "questions": [
      //     {
      //       "question_text": "string",
      //       "pda_id": 0,
      //       "choices": [
      //         {
      //           "choice_text": "string",
      //           "is_correct": true
      //         }
      //       ]
      //     }
      //   ]
      // };
      console.log(body);

      this.adminService.post("tests", body).subscribe(data => {
        debugger;
        this.closeQiuz();
        this.getQuizList();
      })
    }

  }

  getPersonalDevelopmenetAreas() {
    this.adminService.get('personalDevelopmentAreas').subscribe({
      next: (response) => {
        this.personalDevelopmentAreas = response;
      }
    })
  }

  createQuestion() {
    this.quizQuestionArr.push({
      question_text: "",
      pda_id: 0,
      choices: [],
    });
  }

  checkCheckBoxvalue(event: any, questionId: number, optionId: number) {
    for (let index = 0; index < this.quizQuestionArr[questionId].choices.length; index++) {
      this.quizQuestionArr[questionId].choices[index].is_correct = false;
    }
    this.quizQuestionArr[questionId].choices[optionId].is_correct = true;
    console.log(questionId, optionId);
  }

  createOption(id: number) {
    this.quizQuestionArr[id].choices.push({
      choice_text: "",
      is_correct: false
    });
  }

  actionEvents(event: ActionEvent) { }

}
