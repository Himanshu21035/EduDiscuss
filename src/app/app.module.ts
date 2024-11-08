import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TagsComponent } from './tags/tags.component';
import { QuesFormComponent } from './ques-form/ques-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { DummyComponent } from './dummy/dummy.component';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';



const appRoutes: Routes=[
  {path:'',component: LandingPageComponent  },
  { path:'signup',component: SignupPageComponent },
  { path:'tags', component: TagsComponent },
  {path:'create',component:QuesFormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    HeaderComponent,
    LandingPageComponent,
    SidebarComponent,
    TagsComponent,
    QuesFormComponent,
    // DummyComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    
  ],
  providers: [
   
    
  
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
