import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPComponentLoader } from "@microsoft/sp-loader";

import * as strings from 'EmployeeBirthdaysReactWebPartStrings';
import EmployeeBirthdaysReact from './components/EmployeeBirthdaysReact';
import { IEmployeeBirthdaysReactProps } from './components/IEmployeeBirthdaysReactProps';
import { SPService } from './SPService';

export interface IEmployeeBirthdaysReactWebPartProps {
  description: string;
}

export default class EmployeeBirthdaysReactWebPart extends BaseClientSideWebPart<IEmployeeBirthdaysReactWebPartProps> {

  private _isDarkTheme: boolean = false;
  
  employees: any[];

  public render(): void {
    //Load bootstrap and font awesome css
    SPComponentLoader.loadCss('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    SPComponentLoader.loadCss('https://use.fontawesome.com/releases/v5.0.7/css/all.css');

    const element: React.ReactElement<IEmployeeBirthdaysReactProps> = React.createElement(
      EmployeeBirthdaysReact,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,        
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        employees: this.employees
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    let service = new SPService(this.context)
    return service.getCurrentMonthBirthdays()
      .then(response => {
        console.log('Data from list is ', response);
        this.employees = response.value;
      },
        error => {
          console.error('Ooops error occured ..', error);
          this.employees = [];
        });
  }



  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
