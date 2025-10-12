import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// 必要なプロバイダー関数をインポート
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';


// 作成したルート設定をインポート
import { routes } from './app/app.route';

bootstrapApplication(AppComponent, {
  providers: [
    // 1. ルーティング機能を提供し、ハッシュ形式(#)のURLを使用する設定を追加
    provideRouter(routes, withHashLocation()),

    // 2. アニメーション機能を提供
    provideAnimations(),

    // 3. HttpClient機能を提供
    provideHttpClient(),

    // 4. ServiceWorker機能を提供
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
})
  .catch(err => console.error(err));
