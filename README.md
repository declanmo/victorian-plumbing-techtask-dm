# E-Commerce Product Listing Page

Built with **React + TypeScript**. A preview of this project can be seen at [Cloudflare Pages](https://victorian-plumbing-techtask-dm.pages.dev/)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [API Integration](#api-integration)
- [Implemented Features](#implemented-features)
- [Accessibility](#accessibility)
- [Performance Considerations](#performance-considerations)
- [Testing Strategy](#testing-strategy-not-implemented)
- [Trade-offs & Decisions](#trade-offs--decisions)
- [What I’d Do Next](#what-id-do-next)
- [Getting Started](#getting-started)

---

## Overview

This project is a **product listing page** built using **React and TypeScript**. It consumes the Victorian Plumbing public listings API to render a responsive grid of product cards, with support for sorting and pagination.

---

## Tech Stack

- **React** – Functional components and hooks  
- **TypeScript** – Strict typing throughout  
- **Vite** – Fast development and build  
- **Tailwind CSS** – Utility first styling  
- **Fetch API** – Smart api interaction


---

## API Integration

The listings API is consumed via a **typed client abstraction**, rather than fetching directly inside components.

### Key Considerations

- Centralised handling of sort options and pagination  
- Defensive handling of optional or missing fields  

---

## Implemented Features

### Product Listing Grid
- Responsive CSS Grid layout
- Semantic HTML (`article`, `h2`, `button`)
- Graceful fallbacks for missing images or prices
- Skeleton loading state during fetch

### Sorting
- “Sort by” control mapped directly to API options
- Fully keyboard accessible
- Predictable, controlled state updates

### Load More
- Incremental loading of results
- Disabled controls during fetch
- Scroll position preserved between loads

### Bonus Feature: Shortlist
- Users can save products for comparison

---

## Accessibility

- Semantic HTML elements throughout
- Fully keyboard-navigable interface
- Accessible labels and form controls
- Meaningful alt text for images
- `aria-live` regions for loading and result updates
- Focus-visible styles preserved

The aim was to meet **WCAG AA principles** in a realistic, production-style context.

---

## Performance Considerations

Although this is a client-rendered example, several performance best practices were applied:

- Memoisation of expensive renders
- Lazy loading of images
- Scoped state to reduce unnecessary re-renders
- Avoidance of layout shift during loading


---

## Testing Strategy (Not Implemented)

Unit and E2E tests were generally omitted, as they were **not required** for this exercise.

The architecture is designed to be testable:

- Pure components where possible
- Business logic isolated in hooks
- API layer easily mockable

With more time, I would add:

- Unit tests for utilities and hooks
- Full component tests using Vitest
- E2E tests for critical user journeys

---

## Trade-offs & Decisions

- **No global state library**  
  Kept complexity low and scope focused

- **Partial facet handling**  
  Dynamic behaviour acknowledged without implementing a full filter UI


---

## What I’d Do Next

Given more time, I would:

- Made filters collapsible to reduce page size
- Add Storybook for design system components
- Introduce Unit and E2E test coverage
- Persist filters and sort state via URL
- Explore SSR or edge caching


## Getting Started

```
npm install
```
```
npm run dev
```