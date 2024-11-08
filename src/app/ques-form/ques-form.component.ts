// import { Component,Inject,PLATFORM_ID ,OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
// import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
// import { NgModel } from '@angular/forms';
// import { isPlatformBrowser } from '@angular/common';


// interface tag{
//   name:string;
//   detail:string;
// }
// interface Links{
//   name:string;
//   linker:string;
// }

// @Component({
//   selector: 'app-ques-form',
//   templateUrl: './ques-form.component.html',
//   styleUrl: './ques-form.component.css'
// })
// export class QuesFormComponent implements OnInit {
//   @ViewChild('cont',{static:false}) divRef!:ElementRef;

//   selectedDropdown1='';

//   tags:tag[]=[
//     {name:'Give-Away',detail:'All the giveaways like promo coupons, serial keys, product keys etc.'},
//     {name:'Tutorials and Method',detail:'All the giveaways like promo coupons, serial keys, product keys etc.'},
//     {name:'Courses Link',detail:'All the giveaways like promo coupons, serial keys, product keys etc.'},
//     {name:'Request',detail:'All the giveaways like promo coupons, serial keys, product keys etc.'},
//     {name:'Games',detail:'All the giveaways like promo coupons, serial keys, product keys etc.'},
//     {name:'News',detail:'All the giveaways like promo coupons, serial keys, product keys etc.'},
//     {name:'Software',detail:'All the giveaways like promo coupons, serial keys, product keys etc.'},
//     {name:'Resources',detail:'All the giveaways like promo coupons, serial keys, product keys etc.'},
//     // {name:'',detail:'All the giveaways like promo coupons, serial keys, product keys etc.'},
//   ]
//   options1Visible: boolean = false;

//   showOptions(optionType: string): void {
//     this.hideOptions(); // Hide other options
//     this.options1Visible = true;
//   }
//   hideOptions(): void {
//     this.options1Visible = false;
//   }

//   selectOption(option: string, dropdown: string,controlName:string) {
  
//     // console.log(`Selected option: ${option}`)
//     this.postForm.get(controlName)?.setValue(option);
//     dropdown = option;
    
//     this.hideOptions(); // Hide options after selection
    
//   }

//   postForm: FormGroup;
//   linkForm:FormGroup;
//   content: string = '';
//   editorContent:string='';
//   addLinker:boolean=false;
//   Name:string='';
//   Link:string='';

//   constructor(private fb: FormBuilder,
//     @Inject(PLATFORM_ID) private platformId: Object,
//     private renderer:Renderer2
//   ) {

//     this.postForm = this.fb.group({
//       levelSelected:['',Validators.required],
//       title: ['', Validators.required],
//       content: ['', Validators.required],
//       name:[''],
//       link:['']
//     });
//     this.linkForm=this.fb.group({
//       name:[''],
//       link:['']
//     })
//   }

//   ngOnInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       this.initializeFroalaEditor();
//     }
//   }

//   private initializeFroalaEditor() {
//     // Assuming FroalaEditor is properly imported and initialized here
//   }
//   // onContentInput(event: Event) {
//   //   // const editor = event.target as HTMLDivElement;
//   //   // this.content = editor.innerHTML; // Capture the HTML content
//   //   // this.postForm.patchValue({ content: this.content }); // Update the form control
//   // }

//   // onBlur() {
//   //   // This can be used to update the form control on blur if necessary
//   //   this.postForm.patchValue({ content: this.content });
//   // }

// addLinkerFn(){
//   this.addLinker=!this.addLinker;
// }  


//   // formatText(command: string) {
//   //   // document.execCommand(command, false, ); // Note: execCommand is deprecated
//   //   if(command==='bold'){
//   //     const content=document.getElementById("content")
//   //     if(content){
//   //       content.style.fontWeight = "bold"; 
//   //     }     
//   //   }
//   // }

//   // addLink() {
//   //   const url = prompt('Enter the link URL:');
//   //   const text = prompt('Enter the link text:');
//   //   if (url && text) {
//   //     const linkHTML = `<a href="${url}" target="_blank">${text}</a>`;
//   //     const editor = document.querySelector('.editor') as HTMLDivElement | null; // Add null type
//   //     if (editor) {
//   //       editor.innerHTML += linkHTML; // Append link to the editor
//   //       this.content = editor.innerHTML; // Update the content variable
//   //       this.postForm.patchValue({ content: this.content }); // Update the form control
//   //     }
//   //   }
//   // }
//   newName:string='';
//   newLink:string='';
//   onSubmit() {
//     if (this.postForm.valid) {
//       this.postForm.value.content = this.postForm.value.content.replace(/<[^>]*>/g, "");
//       this.postForm.patchValue({
//         name:this.newName,
//         link:this.newLink
//       })
//       console.log('Form Value:', this.postForm.value);
      
//       // Handle form submission logic here
//     }
//   }
//   onSubmitLink(){
//     this.newName=this.linkForm.get('name')?.value;
//     this.newLink=this.linkForm.get('link')?.value;
//     console.log(this.linkForm.value)
//     const anchorElement=this.renderer.createElement('a');
//     this.renderer.setAttribute(anchorElement,'href',this.newLink);
//     this.renderer.setAttribute(anchorElement,'target','_blank');
//     this.renderer.appendChild(anchorElement,this.newName);
//     this.renderer.appendChild(this.divRef.nativeElement, anchorElement);
//   }
// }
import { Component, Inject, PLATFORM_ID, OnInit, ViewChild, ElementRef, Renderer2,NgZone, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { FroalaEditorModule,FroalaEditorDirective } from 'angular-froala-wysiwyg';
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

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private zone: NgZone
  ) {
    this.postForm = this.fb.group({
      levelSelected: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      name: [''],
      link: ['']
    });
    this.linkForm = this.fb.group({
      name: ['', Validators.required],
      link: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeFroalaEditor();
    }
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
      // Strip HTML tags if you only want plain text
      this.postForm.value.content = this.stripHTML(this.editorContent);

      // Optional: Clean content before submitting
      this.postForm.patchValue({
        name: this.newName,
        link: this.newLink
      });

      console.log('Form Value:', this.postForm.value);
      // Handle form submission logic here (e.g., send to backend)
    }
  }

  // Utility function to strip HTML
  stripHTML(html: string): string {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  // Submit the link form
  onSubmitLink() {
    // Extract values from the link form
    this.newName = this.linkForm.get('name')?.value;
    this.newLink = this.linkForm.get('link')?.value;

    // Create the anchor element dynamically
    const anchorElement = this.renderer.createElement('a');
    this.renderer.setAttribute(anchorElement, 'href', this.newLink);
    this.renderer.setAttribute(anchorElement, 'target', '_blank');
    const textNode = this.renderer.createText(this.newName); // Use textNode for the anchor text
    this.renderer.appendChild(anchorElement, textNode);

    // Append the anchor tag to the divRef
    this.renderer.appendChild(this.divRef.nativeElement, anchorElement);

    // Reset the link form and hide the modal
    this.linkForm.reset();
    this.addLinker = false;
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
  ngAfterViewInit(): void {
    // Initialize Froala on the #editor div
    new FroalaEditor('#editor', {
      events: {
        'froalaEditor.contentChanged': () => {
          console.log('Content updated!');
        }
      }
    });
  }

  // public options: Object = {

  //   charCounterCount: true,
  //   toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','insertFile','alert'],
  //   toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','insertFile','alert'],
  //   toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','insertFile','alert'],
  //   toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','insertFile','alert']
  // };
}
