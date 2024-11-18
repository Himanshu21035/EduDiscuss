import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../shared/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Import AngularFireAuth
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../user.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() questionId!: string;  // Receive questionId from parent component
  answerForm: FormGroup;
  firstName:string='';
  lastName:string='';
  userId:string='';

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,  // To access Firebase Authentication
    private firestore: AngularFirestore, 
  ) {
    this.answerForm = this.fb.group({
      content: ['', Validators.required]  // Content is required for answers
    });
  }
  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;  // Store the user's UID
        // Now, fetch the user details from Firestore using the UID
        this.firestore.collection('users').doc(user.uid).get().subscribe(userDoc => {
          if (userDoc.exists) {
            const userData = userDoc.data() as User;  // Type the data to match the User interface
            this.firstName = userData.firstName;  // Get first name
            this.lastName = userData.lastName;  // Get last name
          }
        });
      }
    });
  }

  submitAnswer(): void {
    if (this.answerForm.valid) {
      const content = this.answerForm.value.content;
      // const username = 'someUser';  // This would be replaced with actual logged-in username
      this.firestoreService.addAnswer(this.questionId, content, this.firstName,this.lastName,this.userId)
        .then(() => {
          console.log('Answer added successfully');
          this.answerForm.reset();
        })
        .catch(error => {
          console.error('Error adding answer: ', error);
        });
    }
  }
}

