import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { BusinessType, AttachmentType } from '@cityocean/basicdata-library';
import { cloneDeep } from 'lodash';
import { DocumentListPanelComponent } from '../../../components/document-list/list-panel/list-panel.component';

const shipmentFileTypeList = [
  {label: 'Commercial Invoice', value: 38},
  {label: 'Packing list', value: 39},
  {label: 'Purchase Order', value: 40},
  {label: 'Declaration material', value: 41},
];

@Component({
  selector: 'document-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class DocumentLayoutComponent implements OnInit {
  @Output() onSuccess = new EventEmitter();
  @Output() onError = new EventEmitter();
  @Output() onSearchSuccess = new EventEmitter();

  @Input() BusinessId?: number; //业务id(比如：是booking就取booking的id)
  @Input() BusinessType?: BusinessType;
  @Input() AttachmentType: AttachmentType;
  @Input() isToIcp = false;
  fileList: any[];
  fileTypeListMap = {
    [BusinessType.Quote]: shipmentFileTypeList,
    [BusinessType.Booking]: shipmentFileTypeList,
    [BusinessType.Shipment]: shipmentFileTypeList,
    [BusinessType.Order]: [],
    [BusinessType.Product]: [],
  };

  @ViewChild('documentListPanelCommpponent') documentListPanelCommpponent: DocumentListPanelComponent;

  constructor() {
  }

  ngOnInit() {
  }

  onTypeChange(e) {
  }

  onDownloadAllFile() {
  }

  downAll(fileList) {
  }

  _onSuccess(e) {
    this.onSuccess.emit(e);
  }

  _onError(e) {
    this.onError.emit(e);
  }

  _onSearchSuccess(e) {
    this.onSearchSuccess.emit(e);
  }

  /**
   * 下载当前列表的所有文件
   * @param fileList 下载文件列表
   */
  downLoadAll(fileList) {
    this.fileList = cloneDeep(fileList);
  }

  upload() {
    this.documentListPanelCommpponent.showFiledModal();
  }

  down() {
    this.documentListPanelCommpponent.downLoadFields();
  }

  deleted() {
    this.documentListPanelCommpponent.deletedFields();
  }

  listHasData() {
    // console.log(this.documentListPanelCommpponent.getFile(),"555555555555555555555555555")
    return false;
    // console.log(this.documentListPanelCommpponent.getFile(),"0000000")
    // return this.documentListPanelCommpponent.getFile().length>0;
  }

  showBtn: boolean = false;

  fileListEmitter(e) {
    this.showBtn = e.length > 0 ? true : false;
  }

}
