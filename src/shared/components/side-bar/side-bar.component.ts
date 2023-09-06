import { Component, OnInit } from '@angular/core';
import { SidebarItem } from './side-bar-item';
import { SidebarService } from './side-bar.service';
import { Router } from '@angular/router';
// import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  sidebarItems: SidebarItem[] = [];

  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit(): void {
    try {
      const signedInUser: any = JSON.parse(localStorage.getItem('currentUser'));

      if (signedInUser && signedInUser.role) {
        this.sidebarItems = this.sidebarService.getSidebarItemsForUser(signedInUser.role);
      }
    } catch (error) {
      console.log(error);
    }

  }

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}
