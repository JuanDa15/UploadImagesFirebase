import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileItem } from '../models/file.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {
  private imgs_forder: string = 'img';

  constructor(private db: AngularFirestore) { }

  loadImageFireBase( files: FileItem[] ){
    const storageRef = firebase.storage().ref()
    
    for (const file of files){
      file.isUploading = true;
      if(file.progress >= 100){
        continue;
      }

      const uploadTask:firebase.storage.UploadTask =  storageRef.child(`${ this.imgs_forder }/${file.fileName}`).put(file.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => file.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => Swal.fire({
          title: 'Error al subidor',
          text: 'error',
          icon: 'error'
        }),
        () => {
          Swal.fire('Subido correctamente','','success')
        });
    }
  }

  private saveImage( image: { name: string, url: string} ){
    this.db.collection(`/${this.imgs_forder}`).add( image );
  }
}
