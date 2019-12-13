import { Injectable } from '@angular/core';
import { Validators, FormGroup, ValidatorFn } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormBuildService } from '../form-build.service';

@Injectable()
export class SignUpValidateConfig {
    public controlsConfig: any;
    public validationMessages: any;
    public formErrors = {
        account: '',
        password: '',
        confirmPassword: ''
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
            ],
            confirmPassword: [
                ,
                [Validators.required]
            ]
        };

        this.setValidationMessages();
        const theForm = this.formBuildService.buildForm(this.controlsConfig, this.formErrors, this.validationMessages);
        theForm.setValidators(this.passwordCompare('password', 'confirmPassword'));

        return theForm;
    }


    private setValidationMessages() {
        this.validationMessages = {
            account: {
                required: () => this.translate.instant('Validate.Required'),
            },
            password: {
                required: () => this.translate.instant('Validate.Required'),
            },
            confirmPassword: {
                required: () => this.translate.instant('Validate.Required'),
                passwordCompare: () => this.translate.instant('Validate.PasswordCompare'),
            }
        };
    }

    private passwordCompare(controlName: string, matchingControlName: string): ValidatorFn {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.passwordCompare) {
                // return if another validator has already found an error on the matchingControl
                return null;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ passwordCompare: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

    resetMessageForI18N(form: FormGroup) {
        this.formBuildService.onValueChanged(form, this.formErrors, this.validationMessages);
    }
}
