import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';  // Import the FirestoreService
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Import AngularFirestore
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private firestoreService: FirestoreService,private firestore:AngularFirestore) {}

  // getQuestions(): Observable<any[]> {
  //   return this.firestore.collection('questions').valueChanges({ idField: 'id' });
  // }

  // Fetch answers for a specific question
  getAnswersForQuestion(questionId: string): Observable<any[]> {
    return this.firestore.collection('answers', ref => ref.where('questionId', '==', questionId)).valueChanges();
  }

  // Add a question using the FirestoreService's addDocument method
  addQuestion(
    levelSelected: string, 
    title: string, 
    content: string, 
    
    firstName: string, 
    lastName: string, 
    userId: string
  ) {
    const question = {
      levelSelected,
      title,
      content,
      firstName,
      lastName,
      userId,
      likes: 0,  // Initial like count
      createdAt: new Date()  // Timestamp for question creation
    };

    // Call FirestoreService to add the question to Firestore
    return this.firestoreService.addDocument('questions', question);
  }

  // Optionally, fetch questions
  getQuestions(): Observable<any[]> {
    // Get all documents from the 'questions' collection
    return this.firestoreService.getCollection('questions').pipe(
      map((docChanges: any[]) => {
        // Map through the document changes and extract the question data
        return docChanges.map((docChange: any) => {
          const questionData = docChange.payload.doc.data();  // Get the actual data of the question
          const id = docChange.payload.doc.id;  // Get the document ID

          return {
            ...questionData,  // Spread the question data
            id: id            // Attach the document ID
          };
        });
      })
    );
  }

  addAnswer(questionId: string, content: string, username: string): Promise<void> {
    const answerId = this.firestore.createId();  // Generate a unique ID for the answer
    const answer = {
      questionId,
      content,
      username,
      likes: 0,  // Initial like count
      createdAt: new Date()  // Add timestamp
    };
  
    return this.firestore.collection('answers').doc(answerId).set(answer);
  }
  

  getQuestionById(questionId: string): Observable<any> {
    return this.firestore.collection('questions').doc(questionId).valueChanges();
  }
}

