import {Component, ElementRef, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {DocumentService} from '../services/api-service/document-service.component';
import {Document} from '../shared/models/record.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HOST, PORT} from '../app.component';

@Component({
    selector: 'base64-upload',
    templateUrl: './base64-upload.component.html'
})

export class Base64UploadComponent {
    data: Document;
    form: FormGroup;
    h: boolean = false;
    error: string;
    public image: SafeResourceUrl;
    loading: boolean = false;
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(public  _DomSanitizer: DomSanitizer,
                private fb: FormBuilder,
                private doc_service: DocumentService,
                private api: HttpClient
    ) {
        this.createForm();
        this.data = new Document();
        this.image = _DomSanitizer.bypassSecurityTrustResourceUrl('');

    }


    createForm() {
        this.form = this.fb.group({
            filetype: ['', Validators.required],
            lang: ['', Validators.required],
            content: null,
            ftext: '',
            _id: ''
        });
    }

    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.form.get('content').setValue(
                    reader.result.split(',')[1]
                );
            };
        }
    }

    onSubmit() {
        console.log(HOST);
        const formModel = this.form.value;
        // console.log('value ', this.form.value);
        this.loading = true;
        this.api.post('http://' + HOST + ':' + PORT + '/ocr', formModel).subscribe(
            result => {
                console.log(result);
                this.data = <Document> result;
                this.error = '';
                console.log(this.data);
                this.loading = false;
            },
            error => {
                console.log(error);
                const er = <HttpErrorResponse> error;
                this.error = er.error['message'];
                console.log(this.error);
                this.loading = false;
            }
        );
    }

    clearFile() {
        this.form.get('content').setValue(null);
        this.fileInput.nativeElement.value = '';
    }

}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        const keys = [];
        for(const key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}
