import type { Component } from "svelte";
import BusinessDashboard from "../components/BusinessDashboard.svelte";
import DataCollectorDashboard from "../components/DataCollectorDashboard.svelte";
import TourGuideDashboard from "../components/TourGuideDashboard.svelte";
import TouristDashboard from "../components/TouristDashboard.svelte";

export interface User {
  type: 'tourist' | 'business' | 'tour-guide' | 'data-collector';
  page: Component;
  sidebarItems: Array<{ name: string; href: string }>;
}

export const dashboardUsers: User[] = [
  {
    type: 'tourist',
    page: TouristDashboard,
    sidebarItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Profile', href: '/dashboard/profile' },
      { name: 'Itineraries', href: '/dashboard/itineraries' }
    ],
  },
  {
    type: 'business',
    page: BusinessDashboard,
    sidebarItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Listings', href: '/dashboard/listings' },
      { name: 'Analytics', href: '/dashboard/analytics' }
    ],
  },
  {
    type: 'tour-guide',
    page: TourGuideDashboard,
    sidebarItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Users', href: '/dashboard/tours' },
      { name: 'Reports', href: '/dashboard/reports' }
    ],
  },
  {
    type: 'data-collector',
    page: DataCollectorDashboard,
    sidebarItems: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Users', href: '/dashboard/tasks' },
      { name: 'Reports', href: '/dashboard/reports' }
    ],
  }
];

