import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IEmployeeBirthdaysReactProps {
  description: string;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  employees: any[];
}
