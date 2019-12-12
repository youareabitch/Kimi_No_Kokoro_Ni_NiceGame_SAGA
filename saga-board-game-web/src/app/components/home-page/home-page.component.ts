import { Component, OnInit } from '@angular/core';
import { AppTranslationService } from 'src/app/services/translate.service';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';

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

  openSignInDialog() {
    const dialog = this.dialog.open(SignInComponent);

    dialog.addPanelClass('bg-dark');
  }
}
