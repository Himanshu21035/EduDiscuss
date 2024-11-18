import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/questions.service';// Import the QuestionsService
import { first, Observable } from 'rxjs'; // For handling async data
import { FirestoreService } from '../shared/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any[] = [];  // Observable of questions
  selectedQuestionId: string='';  // To track the selected questionId
  answers: any[] = [];  // To hold answers for the selected question
  quesId:string='';

  constructor(private questionsService: QuestionsService,private firestoreService:FirestoreService,private router:Router) {}

  ngOnInit(): void {
    // Fetch all questions from Firestore when the component initializes
    this.questionsService.getQuestions().subscribe(
      data => {
        this.questions = data;
        console.log(this.questions)  // Store the fetched questions
      },
      error => {
        console.error('Error fetching questions:', error);  // Handle any errors
      }
    );
    // this.questionsService.getQuestions()
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     this.questions = data;  // Store the fetched questions
    //   },
    //   error => {
    //     console.error('Error fetching questions:', error);
    //   }
    // );
  }

  selectQuestion(questionId: string): void {
    this.selectedQuestionId = questionId;

    // Fetch answers for the selected question
    this.firestoreService.getAnswersForQuestion(questionId).subscribe((answers) => {
      this.answers = answers;
    });
  }
  viewAnswers(questionId: string): void {
    // Navigate to /question/:id, where :id is the questionId
    this.router.navigate(['/question', questionId]);
  }
  // Method to fetch and display answers for the selected question
  // showAnswers(question: any) {
  //   this.selectedQuestion = question;  // Set the selected question
  //   this.answers$ = this.questionsService.getAnswersForQuestion(question.id);  // Get answers for the selected question
  // }
}

