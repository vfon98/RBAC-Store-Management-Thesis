import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/auth/user.service';
import * as AOS from "aos";


@Component({
  selector: 'app-root',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    AOS.init();
  }

getUser(): void {
    console.log(this.userService.getCurrentUser());
  }
}
