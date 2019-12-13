import { Component, OnInit } from '@angular/core';
import { AppTranslationService } from 'src/app/services/translate.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  /** 開啟登入視窗 */
  openSignInDialog() {
    this.dialog.open(SignInComponent);
  }

  /** 開啟註冊視窗 */
  openSignUpDialog() {
    this.dialog.open(SignUpComponent);
  }
}
