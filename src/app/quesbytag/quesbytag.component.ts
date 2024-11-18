
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import ActivatedRoute to get route parameters
import { FirestoreService } from '../shared/firestore.service';

@Component({
  selector: 'app-quesbytag',
  templateUrl: './quesbytag.component.html',
  styleUrl: './quesbytag.component.css'
})
export class QuesbytagComponent implements OnInit{

  levelSelected: string = '';  // Store the selected level
  questions: any[] = [];
  constructor(
    private route: ActivatedRoute,  // ActivatedRoute to get the route parameters
    private firestoreService: FirestoreService,
    private router:Router  // Service to fetch questions from Firebase
  ) {}

  ngOnInit() {
    // Get the 'levelSelected' parameter from the route
    this.route.paramMap.subscribe(params => {
      this.levelSelected = params.get('levelSelected')!;
      console.log(this.levelSelected);
      this.fetchQuestionsByLevel(this.levelSelected);  // Fetch questions based on the selected level
    });
  }

  fetchQuestionsByLevel(level: string) {
    this.firestoreService.getQuestionsByLevel(level).subscribe(data => {
      this.questions = data;
    });
  }
  viewAnswers(questionId: string): void {
    // Navigate to /question/:id, where :id is the questionId
    this.router.navigate(['/question', questionId]);
  }
}
