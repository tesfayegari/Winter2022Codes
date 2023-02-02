import * as React from 'react';
import { IEmployeeBirthdaysReactProps } from './IEmployeeBirthdaysReactProps';


export default class EmployeeBirthdaysReact extends React.Component<IEmployeeBirthdaysReactProps, {}> {
  public render(): React.ReactElement<IEmployeeBirthdaysReactProps> {
    
    console.log('Parent props ', this.props);
    
    return (
      <div className="container-fluid">
        <h2>{this.props.description}</h2>
        <div className="row">
          {/* {this.props?.employees.map(e => <EmployeeCard {...e} context={this.props.context}></EmployeeCard>)} */}
        </div>
      </div>

    );
  }
}

export function EmployeeCard(props: any) {
  console.log('Props is', props);
  //if (props == undefined) return;
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  let picUrl = `${this.props?.context.pageContext.site.absoluteUrl}/_layouts/15/userphoto.aspx?AccountName=${props?.Employee.EMail}&Size=L`;
  return (
    <>
      <div className="card col-12 pt-2">
        <img src={picUrl}
          className="card-img-top" alt="..." />
        <div className="card-body text-center">
          <h5 className="card-title">{props?.Employee.Title}</h5>
          <p className="card-text"><i className="fas fa-birthday-cake"
            style={{ color: 'rgb(230, 15, 176)', fontWeight: '700', fontSize: '1.2em' }}></i> {monthNames[props?.Month - 1]} {props?.Date}</p>
        </div>
      </div>
      <hr className="m-1"></hr>
    </>
  )
}
