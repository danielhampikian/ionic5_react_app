import { IonContent, IonHeader, IonCardHeader, IonCard, IonCardContent, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import AddItem from '../AddItem';
import ItemList from '../ItemList';

const Home: React.FC = () => {

  const [current, setCurrent] = useState(null);

  const getEmpty = () => {
    return ({
      title: '',
      content: '',
      date: '',
      location: '',
      picture: '',
      clear: '',
      initialValue: ''
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic React Firebase</IonTitle>
        </IonToolbar>
      </IonHeader>
      {}
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <h3>New Entry:</h3>
          </IonCardHeader>
          <AddItem title={current} clear={()=>setCurrent(getEmpty())}/>          
            <IonCardContent>
            <h3>Title:</h3>
          </IonCardContent>
          {}
        </IonCard>
        <ItemList doEdit={setCurrent}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
