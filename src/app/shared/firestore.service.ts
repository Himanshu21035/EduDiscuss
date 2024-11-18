
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable,from } from 'rxjs';
import { map } from 'rxjs/operators';

interface Answer {
  questionId: string;
  content: string;
  firstName: string;
  lastName: string;
  userId: string;
  likes: number;             // To track number of likes
  likedby: string[];    // To track if the current user has liked it (0 = not liked, 1 = liked)
  createdAt: Date;  // Timestamp of when the answer was created
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  addAnswer(questionId: string, content: string, firstName:string,lastName:string,userId:string): Promise<void> {
    const answerId = this.firestore.createId();  // Generate a unique ID for the answer
    const answer: Answer = {
      questionId,
      content,
      firstName,
      lastName,
      userId,
      likes: 0,  // Initial like count
      likedby:[],
      createdAt: new Date()  // Add timestamp
    };
  
    // Add the answer to the 'answers' collection
    return this.firestore.collection('answers').doc(answerId).set(answer);
  }


  getAnswersForQuestion(questionId: string): Observable<any[]> {
    return this.firestore.collection('answers', ref => ref.where('questionId', '==', questionId))
                         .valueChanges({ idField: 'id' });
  }


  // Save custom user data (firstName, lastName, phone) to Firestore
  saveUserData(userId: string, firstName: string, lastName: string, selectedCourse: string): Observable<any> {
    const userRef = this.firestore.collection('users').doc(userId);
    return from(
      userRef.set({
        firstName: firstName,
        lastName: lastName,
        course: selectedCourse,
        // You can add a timestamp or other metadata if needed
      })
    );
  }

  // Get user data (optional, if needed later)
  getUserData(userId: string): Observable<any> {
    const userRef = this.firestore.collection('users').doc(userId);
    return userRef.valueChanges();
  }

  addDocument(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }

  // Get data from a Firestore collection
  getCollection(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).snapshotChanges();  // Use snapshotChanges to get both data and metadata (e.g. doc ID)
  }
  getQuestionById(questionId: string) {
    return this.firestore.collection('questions').doc(questionId).valueChanges();  // Fetches a single question by ID
  }
  
  // getAnswersForQuestion(questionId: string) {
  //   return this.firestore.collection('answers', ref => ref.where('questionId', '==', questionId)).valueChanges();  // Fetches answers for a specific question
  // }
  getQuestionsByLevel(level: string): Observable<any[]> {
    return this.firestore
      .collection('questions', ref => ref.where('levelSelected', '==', level))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Record<string, any>; // Assert as object type
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
  updateLikesForQuestion(questionId: string, newLikeCount: number) {
    this.firestore.collection('questions').doc(questionId).update({ likes: newLikeCount });
  }

  // Update likes for an answer
  updateLikesForAnswer(answerId: string, newLikeCount: number) {
    this.firestore.collection('answers').doc(answerId).update({ likes: newLikeCount });
  }

  addLikeToAnswer(answerId: string, userId: string): Promise<void> {
    const answerRef = this.firestore.collection('answers').doc(answerId);
  
    return this.firestore.firestore.runTransaction(async (transaction) => {
      const answerDoc = await transaction.get(answerRef.ref);
  
      if (!answerDoc.exists) {
        throw new Error('Answer not found');
      }
  
      // Type the answer data as `Answer`
      const answerData = answerDoc.data() as Answer;
  
      // Check if the current user has already liked the answer
      if (answerData.likedby) {
        throw new Error('User has already liked this answer');
      }
  
      // Increment the likes and mark the user as liked
      transaction.update(answerRef.ref, {
        likedByCurrentUser: true,   // Mark this answer as liked by the current user
        likes: (answerData.likes || 0) + 1,  // Increment like count
      });
    });
    
  }
  hasUserLikedAnswer(answerId: string, userId: string): Observable<boolean> {
    return this.firestore
      .collection('answers')
      .doc(answerId)
      .collection('likes')
      .doc(userId)
      .valueChanges()
      .pipe(map(like => like ? true : false));
  }
  async likeAnswer(answerId: string, userId: string): Promise<void> {
    const answerRef = this.firestore.collection('answers').doc(answerId);
  
    return this.firestore.firestore.runTransaction(async (transaction) => {
      const answerDoc = await transaction.get(answerRef.ref);
  
      if (!answerDoc.exists) {
        throw "Answer does not exist!";
      }
  
      const answerData = answerDoc.data() as Answer;
      const likedby = answerData.likedby || [];
  
      if (likedby.includes(userId)) {
        // If user already liked, remove userId and decrement likes
        const index = likedby.indexOf(userId);
        if (index > -1) likedby.splice(index, 1);
  
        transaction.update(answerRef.ref, {
          likes: answerData.likes - 1,     // Decrement the like count
          likedby: likedby                 // Update the likedby array
        });
      } else {
        // If user hasn't liked, add userId and increment likes
        likedby.push(userId);
  
        transaction.update(answerRef.ref, {
          likes: answerData.likes + 1,     // Increment the like count
          likedby: likedby                 // Update the likedby array
        });
      }
    });
  }
  
  
  
  
}

