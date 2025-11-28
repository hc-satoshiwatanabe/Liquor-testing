import { Component } from "@angular/core";
import { HeaderComponent } from "./pages/header.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	imports: [HeaderComponent, MatSidenavModule, MatIconModule, RouterModule,MatButtonModule],
})
export class AppComponent {
	title = "Liquor-testing";
	showFiller = false;
}
