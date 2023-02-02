import { WebPartContext } from "@microsoft/sp-webpart-base";


export interface IEmployeeBirthdaysProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  lists: string | string[];
}
