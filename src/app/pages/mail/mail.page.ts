import { NgFor } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import {
  IonicModule,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { Subject, map, take, takeUntil, throwError } from "rxjs";
import { SwipeItemComponent } from "src/app/components/swipe-item/swipe-item.component";
import { AnimatedFabDirective } from "src/app/directives/animated-fab.directive";
import { HideHeaderDirective } from "src/app/directives/hide-header.directive";
import { Mail } from "src/app/models/mails.model";
import { MailsService } from "src/app/services/mails.service";

import { AccountPage } from "../account/account.page";
import { ComposePage } from "../compose/compose.page";

@Component({
  selector: "app-mail",
  templateUrl: "./mail.page.html",
  styleUrls: ["./mail.page.scss"],
  standalone: true,
  imports: [
    IonicModule,
    SwipeItemComponent,
    HideHeaderDirective,
    AnimatedFabDirective,
    NgFor
  ],
})
export class MailPage implements OnInit {
  private popoverCtrl = inject(PopoverController);
  private modalCtrl = inject(ModalController);
  private cdr = inject(ChangeDetectorRef);
  private emailsService = inject(MailsService);

  private ngUnsubscribeEmails: Subject<boolean> = new Subject();
  emails: Mail[] = [];

  ngOnInit() {
    this.emailsService
      .getMailsData()
      .pipe(
        takeUntil(this.ngUnsubscribeEmails),
        take(1),
        map((res) => {
          return res.mails.map((email) => {
            email.color = this.intToRGB(this.hashCode(email.from));
            return email;
          });
        })
      )
      .subscribe({
        next: (res: Mail[]) => {
          this.emails = [...res];
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }

  private hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private intToRGB(i: number) {
    let c = (i & 0x00ffffff).toString(16).toUpperCase();

    return "#" + "00000".substring(0, 6 - c.length) + c;
  }

  async openAccount(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: AccountPage,
      event: ev,
      cssClass: "custom-popover",
    });

    await popover.present();
  }

  doRefresh(ev: any) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }

  removeMail(id: number | string) {
    this.emails = this.emails.filter((email) => email.id !== id);
    this.cdr.detectChanges();
  }

  async openCompose() {
    const modal = await this.modalCtrl.create({
      component: ComposePage,
    });

    await modal.present();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeEmails.next(true);
    this.ngUnsubscribeEmails.complete();
  }
}
