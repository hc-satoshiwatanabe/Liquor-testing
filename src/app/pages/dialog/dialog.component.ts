import { Component } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.scss"],
	imports: [MatDialogModule],
})
export class DialogComponent {}
