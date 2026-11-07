import { FileTypeEnum } from "@entities/enums/file-type.enum";

export const MIME_TYPES: Record<FileTypeEnum, string> = {
    [FileTypeEnum.XLSX]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    [FileTypeEnum.CSV]: 'text/csv;charset=utf-8',
    [FileTypeEnum.PDF]: 'application/pdf',
    [FileTypeEnum.JSON]: 'application/json'
};