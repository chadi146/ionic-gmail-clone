import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: true,
  imports: [IonicModule, RouterModule, NgFor],
})
export class AppComponent {
  public appPages = [
    { title: "Starred", url: "/tabs/mail", icon: "star" },
    { title: "Outbox", url: "/tabs/mail", icon: "paper-plane" },
    { title: "Favorites", url: "/tabs/mail", icon: "heart" },
    { title: "Archived", url: "/tabs/mail", icon: "archive" },
    { title: "Trash", url: "/tabs/mail", icon: "trash" },
    { title: "Spam", url: "/tabs/mail", icon: "warning" },
  ];
  public labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];
}
