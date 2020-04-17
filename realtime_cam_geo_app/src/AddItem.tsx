import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import {useDocument} from "react-firebase-hooks/firestore";
import {IonItem, IonButton, IonInput, IonCard, IonCardContent} from '@ionic/react';
import DataProps from './components/DataProps';
import {Plugins} from '@capacitor/core';
import {useCamera} from  '@ionic/react-hooks/camera';
import {CameraResultType, CameraSource} from '@capacitor/core';

export function debugInfo(logInfo:DataProps) {
    console.log(logInfo.title,logInfo.content,logInfo.date,logInfo.location, logInfo.picture);
};
export function clearInfo(info:DataProps){
        info.title= '';
        info.content= '';
        info.date= '';
        info.location= '';
        info.picture= '';
        info.clear= '';
};

const AddItem: React.FC<DataProps> = (props) => {

    const [item, setItem] = useState<DataProps>({
        title:'',
        content:'',
        date: '',
        location:'',
        picture:''
    });

    const {getPhoto} = useCamera();

    const [value, loading, error] = useDocument(
        firebase.firestore().doc("data/" + props.title),
        {
            snapshotListenOptions: {includeMetadataChanges:true}
        }
    );

    useEffect(() => {
        !loading && props.title && value?.exists && setItem(value.data().name);
    },
    [loading, props.title, value]);

    const addLocation = async () => {
        const {Geolocation} = Plugins;
        const position = await Geolocation.getCurrentPosition();
        const newPos = "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
        return setItem({
            ...item,
            location:newPos
        });
    }
    const takePhoto = async() => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Base64,
            source:CameraSource.Camera,
            quality:100
        });
        const photo = `data:image/jpeg;base64,${cameraPhoto.base64String}`;
        return setItem({
            ...item,
            picture:photo
        });
    }

    const onSave = async() => {
        let collectionRef = firebase.firestore().collection("data");
        if (props.title) {
            await(collectionRef).doc(props.title).set({
                title : item.title, content : item.content, 
                date: new Date().getTime(), location:item.location ? item.location : "",
                picture:item.picture ? item.picture : ""},{merge:true});
                clearInfo(item);
                setItem(item);
                props.clear();
        }
        else {
            await collectionRef.add({
                title : item.title, content : item.content, 
                date: new Date().getTime(), location:item.location ? item.location : "",
                picture:item.picture ? item.picture : ""});
                clearInfo(item);
                setItem(item);
                props.clear();
        }
    };

    const updateField = e => {
        e.preventDefault();
        debugInfo(item);
        setItem({
            ...item,
            [e.target.name]:e.target.value
        });
    };
    
    return (
        <IonCard>
            <IonCardContent>
                <IonItem>
                    <IonInput value={item.title} placeholder="Title" name="title" onIonChange={updateField}>
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput value={item.content} placeholder="Content" name="content" onIonChange={updateField}>
                    </IonInput>
                </IonItem>
                <IonButton onClick={onSave}>Upload
                </IonButton>
                <IonButton onClick={addLocation}>Add Location
                </IonButton>
                <IonButton onClick={takePhoto}>Add Photo
                </IonButton>
            </IonCardContent>
        </IonCard>
    );
}
export default AddItem;