import { Component, OnChanges, OnInit,SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../shared/firestore.service';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit,OnChanges {
  questionId: string = '';  // To hold the selected question's ID
  question: any = {};       // To hold the question data
  answers: any[] = []; 
  userId: string=''; 
  selectedQuestionId: string='';     // To hold the answers for the selected question

  constructor(
    private route: ActivatedRoute,  // To get the URL parameters
    private firestoreService: FirestoreService,  // To get the question and answers from Firestore
    private afAuth: AngularFireAuth,
  ) {}

  ngOnInit(): void {
    // Get the questionId from the route parameter
    this.route.paramMap.subscribe(params => {
      this.questionId = params.get('id')!; 
      this.selectedQuestionId=this.questionId // Extract the questionId from the URL
      this.loadQuestionAndAnswers();
    });
    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.route.paramMap.subscribe(params => {
      this.questionId = params.get('id')!;
      this.selectedQuestionId=this.questionId  // Extract the questionId from the URL
      this.loadQuestionAndAnswers();
    });
  }

  loadQuestionAndAnswers(): void {
    // Fetch the question and its answers from Firestore
    this.firestoreService.getQuestionById(this.questionId).subscribe((questionData) => {
      this.question = questionData;
    });

    this.firestoreService.getAnswersForQuestion(this.questionId).subscribe((answersData) => {
      this.answers = answersData;
    });
  }
  likeQuestion() {
    this.firestoreService.updateLikesForQuestion(this.selectedQuestionId, this.question.likes + 1);
    this.question.likes += 1; // Optimistic UI update
  }

  // Increment likes for a specific answer
  // likeAnswer(answer:any) {
  //   this.firestoreService.updateLikesForAnswer(answer.id, answer.likes + 1);
  //   answer.likes += 1; // Optimistic UI update
  // }
  onLikeClick(answerId: string) {
    if (this.userId) {
      this.firestoreService.likeAnswer(answerId, this.userId)
        .then(() => {
          console.log('Like successfully updated');
        })
        .catch(error => {
          // Display error if user has already liked the answer
          console.error('Error updating like:', error);
        });
    }
  }
}
