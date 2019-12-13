import { Component, OnInit } from '@angular/core';
import { SignUpValidateConfig } from 'src/app/services/validate-configs/sign-up-validate.config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  /** 表單 */
  theForm: FormGroup;
  formErrors: any;

  constructor(
    private validateConfig: SignUpValidateConfig
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /** 表單初始化 */
  initForm() {
    if (!this.theForm) {
      this.theForm = this.validateConfig.init();
      this.formErrors = this.validateConfig.formErrors;
    }
  }
}
