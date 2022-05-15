import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file.model';

@Directive({
  selector: '[NgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files!:FileItem[];
  @Output('OnMouseOver') onMouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { 
  }

  @HostListener('dragover', ['$event']) public onDragEnter( event: DragEvent){
    this.onMouseOver.emit(true);
    this._preventOpenImage(event);
  }
  
  @HostListener('dragleave', ['$event']) public onDragLeave( event: DragEvent){
    this.onMouseOver.emit(false);
    this._preventOpenImage(event);
  }
  
  @HostListener('drop', ['$event']) public onDrop( event: DragEvent){
    const transfer: DataTransfer = this._getData( event ); 
    if( transfer ){
      this._getFiles(transfer.files);
      this._preventOpenImage(event);
      this.onMouseOver.emit(false);
    }
  }


  private _canBeUploaded( file: File): boolean {
    if(!this._fileAlreadyDropped( file.name) && this._isImage(file.type)){
      return true;
    } else{
      return false;
    }
  }

  private _preventOpenImage( event: DragEvent ): void{
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileAlreadyDropped( fileName: string ): boolean {
    
    for ( const file of this.files){
      if(file.fileName === fileName){
        return true;
      }
    }
    return false;
  }

  private _isImage(fileType: string): boolean{
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }

  private _getData( event: any): DataTransfer{
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  } 

  private _getFiles( filesList: File[] | FileList): void{
    for( const property in Object.getOwnPropertyNames(filesList)){
      const tempFile: File = filesList[property];
      if( this._canBeUploaded(tempFile)){
        const newFile: FileItem = new FileItem(tempFile);
        this.files.push(newFile);
      }
    }
  }
}
