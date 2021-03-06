import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignInValidateConfig } from 'src/app/services/validate-configs/sign-in-validate.config';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  /** 表單 */
  theForm: FormGroup;
  formErrors: any;

  constructor(
    private validateConfig: SignInValidateConfig
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
