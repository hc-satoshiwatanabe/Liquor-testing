import {
  bootstrapApplication
} from "@angular/platform-browser";
import {
  AppComponent
} from "./app/app.component";

// 必要なプロバイダー関数をインポート
import {
  provideRouter,
  withHashLocation
} from "@angular/router";
import {
  provideHttpClient,
  withFetch
} from "@angular/common/http";
// 【変更点】同期ロードではなく、非同期ロードのアニメーションプロバイダーを使用
import {
  provideAnimationsAsync
} from "@angular/platform-browser/animations/async";
import {
  provideServiceWorker
} from "@angular/service-worker";
import {
  provideZoneChangeDetection,
  isDevMode
} from "@angular/core";

// 作成したルート設定をインポート
import {
  routes
} from "./app/app.route";

bootstrapApplication(AppComponent, {
  providers: [
    // 1. 【推奨】イベント統合(eventCoalescing)を有効にしてパフォーマンスを向上
    // 引数なしの provideZoneChangeDetection() ではなく設定オブジェクトを渡します
    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    // ルーティング機能を提供し、ハッシュ形式(#)のURLを使用する設定
    provideRouter(routes, withHashLocation()),

    // 2. 【推奨】アニメーション機能を非同期で提供（初期バンドルサイズ削減）
    // provideAnimations() の代わりに provideAnimationsAsync() を使用
    provideAnimationsAsync(),

    // 3. 【推奨】HttpClient機能を提供し、Fetch APIを使用するように設定
    provideHttpClient(withFetch()),

    // 4. ServiceWorker機能を提供
    // isDevMode() を使用して、開発モードかどうかを動的に判定するのが一般的です
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
}).catch((err) => console.error(err));
