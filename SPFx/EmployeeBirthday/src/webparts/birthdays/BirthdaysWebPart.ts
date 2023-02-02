import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPService } from './SPService';



export interface IBirthdaysWebPartProps {
  description: string;
}

export default class BirthdaysWebPart extends BaseClientSideWebPart<IBirthdaysWebPartProps> {
  private employees: any[];

  public render(): void {
    //Load bootstrap and font awesome css
    SPComponentLoader.loadCss('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    SPComponentLoader.loadCss('https://use.fontawesome.com/releases/v5.0.7/css/all.css');

    // const monthNames = ["January", "February", "March", "April", "May", "June",
    //   "July", "August", "September", "October", "November", "December"];

    ///_layouts/15/userphoto.aspx?AccountName=johannal@tt7gd.onmicrosoft.com&Size=L


    let employeesHtml = '';
    for (let e of this.employees) {
      let picUrl = `${this.context.pageContext.site.absoluteUrl}/_layouts/15/userphoto.aspx?AccountName=${e.Employee.EMail}&Size=L`;

      employeesHtml += `<div class="card col-12 pt-2">
                          <img src="${picUrl}"
                              class="card-img-top" alt="...">
                          <div class="card-body text-center">
                              <h5 class="card-title">${e.Employee.Title}</h5>
                              <p class="card-text"><i class="fas fa-birthday-cake"
                                      style="color: rgb(230, 15, 176);font-weight: 700; font-size: 1.2em;"></i> ${this._getMonthName(e.Month)} ${e.Date}</p>
                          </div>
                      </div>
                      <hr class="m-1">
                      `
    }

    this.domElement.innerHTML = `
          <div class="container-fluid">
            <h2>${this.properties.description}</h2>
            <div class="row">
                ${employeesHtml}
            </div>
        </div>`;

  }

  private _getMonthName(m: number) {
    if (m == 1) return 'Jan';
    if (m == 2) return 'Feb';
    if (m == 3) return 'Mar';
    if (m == 4) return 'Apr';
    if (m == 5) return 'May';
    if (m == 6) return 'Jun';
    if (m == 7) return 'Jul';
    if (m == 8) return 'Aug';
    if (m == 9) return 'Sep';
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

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Birthday Webpart Settings"
          },
          groups: [
            {
              groupName: "General Setting",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Webpart Title"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
