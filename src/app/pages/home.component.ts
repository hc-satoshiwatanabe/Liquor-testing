import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <h1 class="title">資格・検定クイズ</h1>
      <nav class="card-list">
        <mat-card class="yubi" [routerLink]="['/question/nihonsyu2']">日本酒検定２級（非公式）</mat-card>
        <mat-card class="yubi" [routerLink]="['/question/nihonsyu3']">日本酒検定３級（非公式）</mat-card>
        <mat-card class="yubi" [routerLink]="['/question/itca']">ITコーディネーター（非公式）</mat-card>
        <mat-card class="yubi" [routerLink]="['/question/marketing3']">マーケティング検定３級（非公式）</mat-card>
        <mat-card class="yubi" [routerLink]="['/question/wine5']">ワイン検定5級（非公式）</mat-card>
      </nav>
    </div>
  `,
  styles: [`
    .container {
      margin: 20px auto;
      max-width: 600px;
      padding: 0 15px;
    }

    .title {
      text-align: center;
      color: #3f51b5;
      margin-bottom: 25px;
    }

    .card-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .yubi {
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 20px;
      font-size: 1.2rem;
      text-align: center;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .yubi:hover {
      background-color: #f5f5f5;
      transform: translateY(-5px);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }
  `],
  standalone: true,
  imports: [MatCardModule, RouterModule]
})
export class HomeComponent { }
