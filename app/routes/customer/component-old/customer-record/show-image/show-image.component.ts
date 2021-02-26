import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { CoConfigManager } from '@co/core';

@Component({
  selector: 'customer-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.less'],
})
export class ShowImageComponent implements OnInit {
  imgList = [];
  imgIndex = 0;
  isImgVisible = false;
  url = CoConfigManager.getValue('storeUrl');
  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.imgIndex = 0;
  }
  downloadImg() {
    let aLink = document.createElement('a');
    aLink.style.display = 'none';
    aLink.setAttribute('target', '_blank');
    aLink.href = this.imgList[this.imgIndex].url;
    aLink.download = '';
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  }
  rotate() {}
  previous() {
    if (this.imgIndex !== 0) {
      this.imgIndex--;
    }
  }
  next() {
    if (this.imgIndex < this.imgList.length - 1 && this.imgList.length >= 2) {
      this.imgIndex++;
    }
  }
}
