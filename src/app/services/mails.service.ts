import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { MailsModel } from "../models/mails.model";

@Injectable({
  providedIn: "root",
})
export class MailsService {
  private httpClient = inject(HttpClient);

  getMailsData(): Observable<MailsModel> {
    return this.httpClient.get<MailsModel>("../../assets/data.json");
  }
}
