
import { Component, Inject, PLATFORM_ID, OnInit, ViewChild, ElementRef, Renderer2,NgZone, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { FroalaEditorModule,FroalaEditorDirective } from 'angular-froala-wysiwyg';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Import AngularFireAuth
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import AngularFirestore
import { QuestionsService } from '../shared/questions.service';
import { User } from '../user.model';
// import { QuestionsService } from '../questions.service'; // Import the Questions Service
// import * as FroalaEditor from 'froala-editor';
// import FroalaEditor from 'froala-editor';
declare var FroalaEditor: any;

interface Tag {
  name: string;
  detail: string;
}

@Component({
  selector: 'app-ques-form',
  // template: <div [froalaEditor]="options" [(froalaModel)]="editorContent"></div>,
  templateUrl: './ques-form.component.html',
  styleUrls: ['./ques-form.component.css']
})
export class QuesFormComponent implements OnInit,AfterViewInit {
  @ViewChild('cont', { static: false }) divRef!: ElementRef;

  selectedDropdown1 = '';
  options1Visible: boolean = false;
  addLinker: boolean = false; // To toggle the visibility of the link form

  tags: Tag[] = [
    { name: 'Give-Away', detail: 'All the giveaways like promo coupons, serial keys, product keys etc.' },
    { name: 'Tutorials and Method', detail: 'All the giveaways like promo coupons, serial keys, product keys etc.' },
    { name: 'Courses Link', detail: 'All the giveaways like promo coupons, serial keys, product keys etc.' },
    { name: 'Request', detail: 'All the giveaways like promo coupons, serial keys, product keys etc.' },
    { name: 'Games', detail: 'All the giveaways like promo coupons, serial keys, product keys etc.' },
    { name: 'News', detail: 'All the giveaways like promo coupons, serial keys, product keys etc.' },
    { name: 'Software', detail: 'All the giveaways like promo coupons, serial keys, product keys etc.' },
    { name: 'Resources', detail: 'All the giveaways like promo coupons, serial keys, product keys etc.' },
  ];

  postForm: FormGroup;
  linkForm: FormGroup;
  editorContent: string = 'helllooo'; // The content of Froala editor, stored here
  newName: string = '';
  newLink: string = '';
  firstName:string='';
  lastName:string='';
  userId:string='';


  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private zone: NgZone,
    private afAuth: AngularFireAuth,  // To access Firebase Authentication
    private firestore: AngularFirestore,  // To access Firestore
    private questionsService: QuestionsService 
  ) {
    this.postForm = this.fb.group({
      levelSelected: ['', Validators.required],
      title: ['', Validators.required],
      content: [''],
    });
    this.linkForm = this.fb.group({
      name: ['', Validators.required],
      link: ['', Validators.required]
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

  private initializeFroalaEditor() {
    // Initialize Froala editor if necessary.
    // You can initialize Froala editor options here if needed.
  }

  showOptions(optionType: string): void {
    this.hideOptions();
    this.options1Visible = true;
  }

  hideOptions(): void {
    this.options1Visible = false;
  }

  selectOption(option: string, dropdown: string, controlName: string) {
    this.postForm.get(controlName)?.setValue(option);
    this.hideOptions();
  }

  addLinkerFn() {
    this.addLinker = !this.addLinker;
  }

  // Submit the main post form
  onSubmit() {
    if (this.postForm.valid) {
      
        this.questionsService.addQuestion(
          this.postForm.value.levelSelected, 
          this.postForm.value.title, 
          this.postForm.value.content, 
           
          this.firstName, 
          this.lastName, 
          this.userId  // User's UID for reference
        )
        .then(() => {
          console.log('Question submitted successfully',
          this.postForm.value.levelSelected, 
          this.postForm.value.title, 
          this.postForm.value.content, 
           
          this.firstName, 
          this.lastName, 
          this.userId
          );
          // Reset form fields after submission
          // this.title = '';
          // this.tags = [];
          // this.topic = '';
          // this.description = '';
        })
        .catch((error) => {
          console.error('Error submitting question:', error);
        });
      // Strip HTML tags if you only want plain text
      
        // const cont = this.postForm.value.content.replace(/<[^>]*>/g, "");


      // Optional: Clean content before submitting
      this.postForm.patchValue({
        name: this.newName,
        link: this.newLink,
        // content:cont
      });

      console.log('Form Value:', this.postForm.value);
      // Handle form submission logic here (e.g., send to backend)
    }
    
  }

  // Utility function to strip HTML
  // stripHTML(html: string): string {
  //   let doc = new DOMParser().parseFromString(html, 'text/html');
  //   return doc.body.textContent || '';
  // }

  // Submit the link form
  onSubmitLink() {
    // Extract values from the link form
    this.newName = this.linkForm.get('name')?.value;
    this.newLink = this.linkForm.get('link')?.value;

    // Create the anchor element dynamically
    // const anchorElement = this.renderer.createElement('a');
    // this.renderer.setAttribute(anchorElement, 'href', this.newLink);
    // this.renderer.setAttribute(anchorElement, 'target', '_blank');
    // const textNode = this.renderer.createText(this.newName); // Use textNode for the anchor text
    // this.renderer.appendChild(anchorElement, textNode);

    // // Append the anchor tag to the divRef
    // this.renderer.appendChild(this.divRef.nativeElement, anchorElement);

    // // Reset the link form and hide the modal
    // this.linkForm.reset();
    // this.addLinker = false;
  }
  // editorContent = '';
  public options: Object = {
    // charCounterCount: true,
    // // Specify the buttons you want in the toolbar
    // toolbarButtons: [
    //   'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize',
    //   'color', 'inlineStyle', 'paragraphStyle', 'paragraphFormat', 'align', 'formatOL', 
    //   'formatUL', 'indent', 'outdent', 'insertLink', 'insertImage', 'insertVideo',
    //   'insertFile', 'insertTable', 'undo', 'redo', 'html', 'fullscreen'
    // ],
    // toolbarButtonsXS: [
    //   'insertFile'
    // ],
    // // Additional configurations (optional)
    // imageUpload: true,
    // videoUpload: true,
    // fileUpload: true,
    // heightMin: 300,

    events: {

      'froalaEditor.contentChanged': function () {

        console.log('Content updated!');

      }

    }

  };
  editorOptions = {
    toolbarButtons: ['bold', 'italic', 'underline', 'insertImage', 'insertLink']
  };
  ngAfterViewInit(): void {
    const editor = new FroalaEditor('#edit', {
      toolbarButtons: ['bold', 'italic', 'underline', 'insertImage', 'insertLink'],
      events: {
        'contentChanged': () => {
          console.log('contentChanged event fired');
          this.zone.run(() => {
            console.log('content changed');
            const content = editor.html.get();
            console.log('Updated Content:', content);
            this.postForm.get('content')?.setValue(content, { emitEvent: false });
          });
        }
      }
    });
    console.log('Froala Editor Initialized:', editor);




  }
  // public options: Object = {

  //   charCounterCount: true,
  //   toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','insertFile','alert'],
  //   toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','insertFile','alert'],
  //   toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','insertFile','alert'],
  //   toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','insertFile','alert']
  // };
}
// Initialize Froala on the #editor div
    // new FroalaEditor('#editor', {
    //   events: {
    //     'froalaEditor.contentChanged': () => {
    //       console.log('Content updated!');
    //     }
    //   }
    // });
    // {"Article":"","Difficulty":"","Practice":"","Video":""}