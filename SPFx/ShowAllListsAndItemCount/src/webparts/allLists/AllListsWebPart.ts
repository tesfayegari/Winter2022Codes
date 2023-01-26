import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPHttpClient } from "@microsoft/sp-http";



export interface IAllListsWebPartProps {
  description: string;
  webpartTitle: string;
}

export default class AllListsWebPart extends BaseClientSideWebPart<IAllListsWebPartProps> {

  listsHtml: string;

  public render(): void {
    //bootstrap cdn css link      
    let cssLink = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css";
    //Use SPComponentLoader object to reference CDN Css link to your project
    SPComponentLoader.loadCss(cssLink);



    this.domElement.innerHTML = `
              <ol class="list-group list-group-numbered">

                ${this.listsHtml}

              </ol>
                `;
  }

  protected onInit(): Promise<void> {   
    this.listsHtml = '';

    return this._getSharePointLists().then(data => {
      console.log('Data from SharePoint is ', data);
      let lists = data.value;
      for (let l of lists) {
        console.log(`${l.Title} -  ${l.ItemCount} -  ${l.LastItemModifiedDate}`)
        this.listsHtml += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${l.Title}</div>
            ${(new Date(l.LastItemModifiedDate)).toLocaleDateString()}
          </div>
          <span class="badge bg-primary rounded-pill">${l.ItemCount}</span>
        </li>`;
      }
    });
  }

  private _getSharePointLists() {
    let api = "/_api/web/lists?$filter=Hidden eq false&$select=Title,ItemCount,LastItemModifiedDate";
    let url = this.context.pageContext.web.absoluteUrl + api;
    //Read SharePoint Data using REST end point url 
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then(response => response.json(), error => console.error('Oops error occured ', error));

  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Configurations used for the details of webpart displaying All lists"
          },
          groups: [
            {
              groupName: "General Setting",
              groupFields: [
                PropertyPaneTextField('webpartTitle', {
                  label: "Webpart Title"
                }),
                PropertyPaneTextField('description', {
                  label: "Webpart Description",
                  multiline: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
