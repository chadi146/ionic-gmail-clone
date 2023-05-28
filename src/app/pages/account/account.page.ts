import { Component, inject } from "@angular/core";
import { IonicModule, PopoverController } from "@ionic/angular";

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"],
  standalone: true,
  imports: [IonicModule],
})
export class AccountPage {
  private popoverCtrl = inject(PopoverController);

  close() {
    this.popoverCtrl.dismiss();
  }
}
