import * as React from 'react';

import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

import { IEmployeeBirthdaysProps } from './IEmployeeBirthdaysProps';

export interface IEmployeeBirthdaysState {
  myValue: number;
}


export default class EmployeeBirthdays extends React.Component<IEmployeeBirthdaysProps, IEmployeeBirthdaysState> {
  //myValue: number = 0;

  constructor(props: IEmployeeBirthdaysProps) {
    super(props);
    this.state = {
      myValue: 0
    }
  }

  plusClicked = (e: any) => {
    //this.myValue++;
    let locValue = this.state.myValue;
    locValue++;//locValue = locValue + 1
    this.setState({ myValue: locValue });
    console.log("Plus clicked", this.state.myValue);
  }
  minusClicked = (e: any) => {
    let locValue = this.state.myValue;
    locValue--;//locValue = locValue - 1;
    this.setState({ myValue: locValue })
    console.log("Minus clicked", this.state.myValue);
  }

  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }

  public render(): React.ReactElement<IEmployeeBirthdaysProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName
    // } = this.props;
    console.log('Render loading', this.props);

    return (
      <div>
        {this.props.lists == undefined || this.props.lists == "" ?
          <Placeholder iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={this._onConfigure}
          //theme={this.props.themeVariant} 
          /> :
          <div>
            <h1 className='container'>This is from parent component </h1>
            <BirthdayCard name="Tesfaye Gari" course="SharePoint" email='tesfaye@email1.com'></BirthdayCard>
            <button onClick={this.plusClicked}>+</button>
            <span style={{ fontSize: '18px', fontWeight: '700' }}>{'  ' + this.state.myValue + '  '}</span>
            <button onClick={this.minusClicked}>-</button>
          </div>
        }

      </div>
    );
  }
}

export interface IBirthdayCard {
  name?: string;
  course?: string;
  email?: string;
}

export function BirthdayCard(props: IBirthdayCard) {
  return (
    <div>
      <h1>Coming soon...</h1>
      <h2>Hello {props.name}, you are taking course: {props.course}</h2>
    </div>
  );
}
