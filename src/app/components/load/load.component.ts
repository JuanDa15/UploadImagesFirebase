import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file.model';
import { UploadImagesService } from 'src/app/services/upload-images.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {
  private _files: FileItem[];
  public isOverDropZone: boolean;

  get files(){
    return this._files;
  }
  
  constructor(private _uploadImagesService: UploadImagesService) { 
    this._files = [];
    this.isOverDropZone = false;
  }

  ngOnInit(): void {
  }

  public load_images(){
    this._uploadImagesService.loadImageFireBase(this._files);
  }

  public updateIsOverDropZone( event: boolean ){
    this.isOverDropZone = event;
  }

  public clearFiles(){
    this._files = [];
  }
}
