import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})

export class TagsComponent {

  constructor(private router: Router) {}
  onTagClick(tag: any) {
    this.router.navigate([`/tags/${tag}`]);  
  }
}
