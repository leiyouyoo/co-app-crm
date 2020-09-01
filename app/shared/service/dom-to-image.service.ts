import { Injectable } from '@angular/core';
import domToImage from 'dom-to-image';
import { StorageFileService } from '@co/cds';
import { I18nMessageService } from '@co/common';
import { CoConfigManager } from '@co/core';

function SelectText(element) {
  const doc = document;
  if ((doc.body as any).createTextRange) {
    const range = (doc.body as any).createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
function dataURItoFile(dataURI) {
  // convert base64 to raw binary data held in a string
  let byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  let arrayBuffer = new ArrayBuffer(byteString.length);
  let _ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    _ia[i] = byteString.charCodeAt(i);
  }

  let blob = new File([_ia], 'image.png',{ type: mimeString });
  return blob;
}

@Injectable({
  providedIn: 'root'
})
export class DomToImageService {

  constructor(private storageFileService: StorageFileService,
              private i18nMessageService: I18nMessageService,
              ) { }

  async copyImageByDom(eleList: HTMLElement[], option: any) {
    const imgList = await Promise.all(
      eleList.map(async (ele) => {
        const data = await domToImage
          .toPng(ele, option);
        const res: any = await this.storageFileService.upload({ file: dataURItoFile(data), fileName: 'share.png' })
          .toPromise();
        let img = document.createElement('img');
        img.src = `${CoConfigManager.getValue('serverUrl')}/Storage/File/GetDownLoadFile?fileId=${res.fileId}&handler=image`;
        return new Promise<HTMLElement>(resolve => {
          img.onload = () => {
            resolve(img);
          }
        })
      })
    );

    let div = document.createElement('div');
    div.contentEditable = 'true';
    imgList.forEach(img => {
      div.appendChild(img);
    });

    document.body.appendChild(div);
    SelectText(div);
    document.execCommand('Copy');
    document.body.removeChild(div);
    this.i18nMessageService.success('Copied');
  }
}
