export type UserType = {
  _id: string;
  username: string;
  password: string;
};

export type EventType = {
  _id: string;
  name: string;
  date: string;
  eventType: "video" | "image";
  eventFile: string;
  attendeesFile: string;
  attendeesCount: number;
  link: string;
};
