import React from 'react';
import './SaveData.css';
import DataProps from './DataProps';
import {IonCard, IonButton, IonCardHeader, IonCardContent} from '@ionic/react';


  const SaveData: React.FC<DataProps> = (props) => {
    return (
      <IonCard>
        <IonCardHeader>
        <p>Info to save so Far:</p>
        </IonCardHeader>
        <IonCardContent>
        <p>{props.title}</p>
        <p>{props.content}</p>
        <p>{props.date}</p>
        <p>{props.location}</p>
        <p>{props.picture}</p>
        <IonButton className="buttonCustom">Save To Database</IonButton>
        <IonButton>Clear All</IonButton>
        </IonCardContent>
      </IonCard>
    );
  };
  
  export default SaveData;