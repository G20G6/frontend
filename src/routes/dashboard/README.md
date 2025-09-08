# Dashboard Page Documentation

## Overview

This directory contains the dashboard implementation with different views based on user types. The dashboard's logic is separated into controller, model, and view components.

## Structure

### `controller.svelte.ts`

Contains the main dashboard logic and state management:

- `dashboardState`: Manages current user type and view selection
- Methods for handling dashboard interactions and view switching

### `model.ts`

Contains static data and interfaces used across dashboard components:

- User type definitions
- Static dashboard content
- Data structures for dashboard elements

### `/components`

Different dashboard views based on user types:

- BusinessDashboard
- TouristDashboard
- TourGuideDashboard
- DataCollectorDashboard

## Flow

1. User authentication determines `user_type`
2. `controller.svelte.ts` uses `dashboardState` to identify user type
3. Appropriate dashboard component is rendered from `/components`
4. Dashboard-specific data is loaded from `model.ts`

## Usage

The dashboard automatically renders the correct view based on the authenticated user's type. No manual view selection is required.
