export interface SharingFile {
  uploadBy:      string;
  creationTime:  string;
  sharingItems:  SharingItem[];
  id:            number;
  businessId:    number;
  businessType:  number;
  attachmentType: number;
  fileId:        string;
  fileName:      string;
  extensionName: string;
}

interface SharingItem {
  targetUserFullName: string;
  targetCompanyName:  string;
  id:                 number;
  targetUserId:       number;
  targetCustomerId:   number;
  targetPartnerId:    number;
}
