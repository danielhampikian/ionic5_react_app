import React from 'react';
import Item from "./Item";
import firebase from 'firebase';
import {useCollection} from "react-firebase-hooks/firestore";
import {IonList} from '@ionic/react';


interface Props {
    doEdit:any
   }
const ItemList: React.FC<Props> = ({doEdit}) => {
    const [value, loading, error] = useCollection(
        firebase.firestore().collection("data").orderBy("createdOn","desc"),
        {
            snapshotListenOptions:{includeMetadataChanges: true}
        }
    );
    const closeSlidingItems = () => {
        
        let list = document.getElementById("list") as any;
        list.closeSlidingItems();
    };
    const doDelete = id => {
        firebase.firestore().collection("data").doc(id).delete();
    };
    return (

        <IonList id="list">
            {value && 
            value.docs.map(doc => {
                return (
                    !loading && (
                        <Item doc={doc}
                        doEdit = {i => {
                            closeSlidingItems();
                            doEdit(i);
                        }}
                        doDelete = {i => {
                            closeSlidingItems();
                            doDelete(i);
                        }}
                    key = {doc.id}
                    />
                    )
                );
            })}
        </IonList>

    );
}
export default ItemList;