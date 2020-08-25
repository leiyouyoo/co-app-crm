import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'document-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
})
export class DocumentToolbarComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDownloadAllFile = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onAttachmentTypeChange = new EventEmitter();
  @Input() fileList: any = [];
  @Input() fileTypeList: any[] = [];

  public selectedValue: any;

  typeValue: number = null;

  constructor() {}

  ngOnInit() {
    if (this.fileTypeList.length) {
      this.typeValue = this.fileTypeList[0].value;
    }
  }
  downAllFile() {
    if (this.fileList.length > 1) {
      this.fileList.forEach((file) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.style.height = '0px';
        iframe.src = file.downFileUrl;
        document.body.appendChild(iframe);
        setTimeout(() => {
          iframe.remove();
        }, 1000);
      });
    }
  }
  ngModelChange(e) {
    this.onAttachmentTypeChange.emit(e);
  }
}
