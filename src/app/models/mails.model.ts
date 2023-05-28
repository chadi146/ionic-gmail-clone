export interface MailsModel {
  mails: Mail[];
}

export interface Mail {
  from: string;
  read: boolean;
  content: string;
  date: string;
  star: boolean;
  subject: string;
  id: string;
  color?: string;
}
