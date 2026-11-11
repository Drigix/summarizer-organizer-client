import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '@config/url.const';
import { FileTypeEnum } from '@entities/enums/file-type.enum';
import { map, Observable } from 'rxjs';
import { MIME_TYPES } from '@entities/types/mime.types';
import { ReportTypeEnum } from '@entities/enums/report-type.enum';

@Injectable({ providedIn: 'root' })
export class DataExtractorService {

    private resourceUrl = SERVER_URL + 'data-extractor';

    constructor(private http: HttpClient) { }

    extractSettlementToFile(dateFrom: Date, dateTo: Date, reportType: ReportTypeEnum, fileType: FileTypeEnum): Observable<Blob> {
        return this.http.get(
            `${this.resourceUrl}/settlement/${dateFrom.toISOString()}/${dateTo.toISOString()}/${reportType}/${fileType}`,
            { responseType: 'blob' }
        ).pipe(map(blob => new Blob([blob], { type: MIME_TYPES[fileType] })));
    }
}