import { NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Subject, map, take, takeUntil, throwError } from "rxjs";
import { Mail } from "src/app/models/mails.model";
import { MailsService } from "src/app/services/mails.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
  standalone: true,
  imports: [IonicModule, NgIf],
})
export class DetailsPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private emailsService = inject(MailsService);

  private ngUnsubscribeEmails: Subject<boolean> = new Subject();
  data!: Mail;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    this.emailsService
      .getMailsData()
      .pipe(
        takeUntil(this.ngUnsubscribeEmails),
        take(1),
        map((res) => {
          return res.mails.filter((email) => email.id == id)[0];
        })
      )
      .subscribe({
        next: (res: Mail) => {
          this.data = { ...res };
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeEmails.next(true);
    this.ngUnsubscribeEmails.complete();
  }
}
