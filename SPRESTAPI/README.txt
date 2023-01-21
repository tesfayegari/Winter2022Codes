REST API 

Web Site address: https://xxxx.sharepoint.com/sites/ContosoPortal

Entry API end point 
WebURl/_api

Site information 
WebURl/_api/site

Ex. https://xxx.sharepoint.com/sites/ContosoPortal/_api/site

Web Information 
WebURl/_api/web

All lists and Libraries 
WebURl/_api/web/lists

Get only specific properties:- By using OData $select
Ex: WebURl/_api/web/lists?$select=Prop1,Prop2,Prop3,...
to see properties Title,ItemCount, Hidden
WebURl/_api/web/lists?$select=Title,ItemCount,Hidden

How can we get based on specific value (filtering example get all lists which are not hidden)
This is done using odata $filter=Prop operator value
prop operator value 
equality eq 
less than - lt, greater than gt, less than or eqaual le, greater or equal ge not eqal ne ...
Example get all lists where Hidden property is false 
WebURl/_api/web/lists?$select=Title,ItemCount,Hidden&$filter=Hidden eq false

Get one specific list 
WebURl/_api/web/lists/getbytitle('List Title')
WebURl/_api/web/lists(guid'ListGuid')

All items in a list 
WebURl/_api/web/lists/getbytitle('List Title')/items
WebURl/_api/web/lists(guid'ListGuid')/items

One item detail when item ID = 4
WebURl/_api/web/lists(guid'ListGuid')/items(4)
WebURl/_api/web/lists/getbytitle('List Title')/items(4)