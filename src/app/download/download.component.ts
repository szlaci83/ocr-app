import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Document} from '../shared/models/record.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HOST, PORT} from '../app.component';


@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.css']
})

export class DownloadComponent implements OnInit {
    data: Document;
    ids: string[];
    selectedId: string;
    form: FormGroup;
    error: string;
    public image: SafeResourceUrl;
    loading: boolean = false;
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(public  _DomSanitizer: DomSanitizer,
                private api: HttpClient,
                private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            ids: ' ',
            ftext: ' ',
            _id: ' '
        });
    }

    ngOnInit() {
        this.api.get('http://' + HOST + ':' + PORT + '/records').subscribe(
            (
                data => {
                    this.ids = Object.values(data);
                    console.log(this.ids);
                }
            ));
    }

    onSubmit() {
        const selected = this.form.controls['selectedId'].value;
        console.log('value ', selected);
        this.loading = true;
        this.api.get('http://' + HOST + ':' + PORT + '/records?id=' + selected, {headers: this.headers, observe: 'response'})
            .subscribe(result => {
                    console.log(result);
                    this.error = '';
                    if (result.body[0] === undefined) {
                        this.error = 'RECORD NOT FOUND!';
                    } else {
                        this.data = <Document> result.body[0];
                        console.log(this.data);
                    }
                    this.loading = false;
                },
                error => {
                    console.log(error);
                    const er = <HttpErrorResponse> error;
                    this.error = er.error['message'];
                    console.log(this.error);
                    this.loading = false;
                    this.selectedId = '';
                });
    }
}
