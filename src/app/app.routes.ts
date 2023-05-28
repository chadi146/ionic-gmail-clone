import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "tabs",
    pathMatch: "full",
  },
  {
    path: "tabs",
    loadComponent: () =>
      import("./pages/tabs/tabs.page").then((m) => m.TabsPage),
    children: [
      {
        path: "mail",
        loadComponent: () =>
          import("./pages/mail/mail.page").then((m) => m.MailPage),
      },
      {
        path: "meet",
        loadComponent: () =>
          import("./pages/meet/meet.page").then((m) => m.MeetPage),
      },
      {
        path: "",
        redirectTo: "mail",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "mail/:id",
    loadComponent: () =>
      import("./pages/details/details.page").then((m) => m.DetailsPage),
  },
];
