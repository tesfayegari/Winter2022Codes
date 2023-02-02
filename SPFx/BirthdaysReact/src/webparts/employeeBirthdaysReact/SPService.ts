import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";

export class SPService {

    constructor(private context: WebPartContext) { }

    getSharePointListData(apiUrl: string) {
        return this.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)
            .then(response => response.json(), error => console.error('Oops error occured ', error));
    }

    getCurrentMonthBirthdays() {
        let currentMonth = (new Date()).getMonth() + 1;
        let api = `/_api/web/Lists/getbytitle('EmployeeBirthdays')/items?$filter=Month eq ${currentMonth}&$select=Month,Date,Employee/Title,Employee/EMail&$expand=Employee&$OrderBy=Date`;
        let url = this.context.pageContext.web.absoluteUrl + api;
        return this.getSharePointListData(url);
    }
}