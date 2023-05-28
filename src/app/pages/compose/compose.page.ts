import { Component, inject } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: "app-compose",
  templateUrl: "./compose.page.html",
  styleUrls: ["./compose.page.scss"],
  standalone: true,
  imports: [IonicModule],
})
export class ComposePage {
  private modalCtrl = inject(ModalController);

  close() {
    this.modalCtrl.dismiss();
  }
}
