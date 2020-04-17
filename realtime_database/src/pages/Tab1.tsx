import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, 
  IonCard, IonTitle, IonToolbar, IonCardHeader, IonCardContent } from '@ionic/react';
import './Tab1.css';
import AddItem from '../AddItem';
import ItemList from '../ItemList';
import SaveData from '../components/SaveData';


const Tab1: React.FC = () => {

  const [current, setCurrent] = useState(null);

  const getEmpty=()=>{
  return ({
    title: '',
    content: '',
    date: '',
    location: '',
    picture: '',
    clear:'',
    initialValue:''
  });
}


  return (
    <IonPage>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        {}
        <IonCard>

          <IonCardHeader>
          <h3>New Entry:</h3>
          </IonCardHeader>
          <IonCardContent>
          <h3>Title:</h3>
          <AddItem initialValue={current} clear={()=>setCurrent(getEmpty())}/>
          <h3>Content:</h3>
          </IonCardContent>
          {}
          <ItemList doEdit={setCurrent}/>
        </IonCard>
        {/* <SaveData title="test" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
