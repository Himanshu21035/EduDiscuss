import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { firebaseConfig } from './firebase.config';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


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
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { AnswerComponent } from './answer/answer.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuesbytagComponent } from './quesbytag/quesbytag.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
// import { DummyComponent } from './dummy/dummy.component';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';



const appRoutes: Routes=[
  {path:'',component: TagsComponent },
  {path:'home',component: LandingPageComponent},
  {path:'question',component: QuestionsComponent},
  {path:'tags', component: TagsComponent  },
  {path:'tags/:levelSelected',component:QuesbytagComponent},
  // { path: '', redirectTo: '/tags', pathMatch: 'full' },
  {path:'create',component:QuesFormComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  { path: 'question/:id', component: QuestionDetailComponent,canActivate:[AuthGuard] },
  {path:'verify-email',component:VerifyEmailComponent},
  {path:'forget-password',component:ForgotPasswordComponent},
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
    SignupComponent,
    LoginComponent,
    QuestionsComponent,
    AnswerComponent,
    QuestionDetailComponent,
    QuesbytagComponent,
    LoadingSpinnerComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
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
    AngularFireModule.initializeApp(firebaseConfig),    
    AngularFireAuthModule, 
  ],
  providers: [
   
    
  
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
