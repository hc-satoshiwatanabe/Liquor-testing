import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuestionComponent } from './pages/question/question.component';

// AppRoutingModuleからルート定義のみを移設
export const routes: Routes = [
  { path: 'question/:id', component: QuestionComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
