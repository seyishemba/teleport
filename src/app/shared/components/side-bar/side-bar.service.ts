import { Injectable } from '@angular/core';
import { SidebarItem } from './side-bar-item';
import { UserRole } from '../../models/user.model';

@Injectable()
export class SidebarService {
  private sidebarItemsByUser: Map<string, SidebarItem[]> = new Map<
    string,
    SidebarItem[]
  >();

  constructor() {
    this.sidebarItemsByUser.set(UserRole.Customer, [
      { label: 'Dashboard', icon: 'dashboard', route: '/client/dashboard' },
      { label: 'Requests', icon: 'departure_board', route: '/client/booking-requests' },
      { label: 'Quotes', icon: 'request_page', route: '/client/quotes' },
      { label: 'Contracts', icon: 'request_page', route: '/client/contracts' },
      { label: 'Tours', icon: 'directions_bus', route: '/client/tours' },
      { label: 'Reports', icon: 'receipt_long', route: '/client/reports' },
      { label: 'Invoices', icon: 'receipt', route: '/client/invoices' },
    ]);

    this.sidebarItemsByUser.set(UserRole.LeasingAgent, [
      { label: 'Dashboard', icon: 'dashboard', route: '/leasing-agent/dashboard' },
      { label: 'Requests', icon: 'departure_board', route: '/leasing-agent/booking-requests' },
      { label: 'Quotes', icon: 'request_page', route: '/leasing-agent/quotes' },
      { label: 'Contracts', icon: 'request_page', route: '/leasing-agent/contracts' },
      { label: 'Tours', icon: 'calendar_today', route: '/leasing-agent/tours' },
      { label: 'Departures', icon: 'departure_board', route: '/leasing-agent/departures' },
      { label: 'Drivers', icon: 'people', route: '/leasing-agent/drivers' },
      { label: 'Vehicles', icon: 'directions_bus', route: '/leasing-agent/vehicles' },
      { label: 'Customers', icon: 'person', route: '/leasing-agent/customers' },
      { label: 'Invoices', icon: 'receipt', route: '/leasing-agent/invoices' },
      { label: 'Reports', icon: 'receipt_long', route: '/leasing-agent/reports' },
    ]);

    this.sidebarItemsByUser.set(UserRole.Driver,[
      {label:'Dashboard',icon:'dashboard',route:'/driver/dashboard'},
      {label:'Tour Schedules',icon:'directions_bus',route:'/driver/tour-schedules'},
      {label:'Availability',icon:'schedule',route:'/driver/availability'},
      {label:'Reports',icon:'receipt_long',route:'/driver/reports'},
      {label:'Paysheet',icon:'receipt',route:'/driver/paysheet'},
    ])
  }

  getSidebarItemsForUser(userRole: UserRole): SidebarItem[] {
    return this.sidebarItemsByUser.get(userRole) || [];
  }
}
