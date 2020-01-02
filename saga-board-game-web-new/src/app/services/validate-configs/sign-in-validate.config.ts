import { Injectable } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormBuildService } from '../form-build.service';

@Injectable()
export class SignInValidateConfig {
    public controlsConfig: any;
    public validationMessages: any;
    public formErrors = {
        account: '',
        password: '',
    };

    constructor(
        private formBuildService: FormBuildService,
        private translate: TranslateService
    ) { }

    init(): FormGroup {
        this.controlsConfig = {
            account: [
                ,
                [Validators.required]
            ],
            password: [
                ,
                [Validators.required]
            ]
        };

        this.setValidationMessages();
        const theForm = this.formBuildService.buildForm(this.controlsConfig, this.formErrors, this.validationMessages);

        return theForm;
    }


    private setValidationMessages() {
        this.validationMessages = {
            account: {
                required: () => this.translate.instant('Validate.Required'),
            },
            password: {
                required: () => this.translate.instant('Validate.Required'),
            }
        };
    }

    resetMessageForI18N(form: FormGroup) {
        this.formBuildService.onValueChanged(form, this.formErrors, this.validationMessages);
    }
}
