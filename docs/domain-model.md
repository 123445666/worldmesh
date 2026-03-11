# Domain Model

## Core entities

### Problem
A real-world issue that needs coordinated action.

Examples:
- recurring flooding in a district
- shortage of food deliveries
- unsafe housing conditions

### Project
A bounded initiative under a problem.

Examples:
- map flood-prone streets
- recruit volunteer drivers
- inspect damaged homes

### Task
A concrete unit of work.

Examples:
- survey 12 streets
- call 20 volunteers
- upload permit documents

### Person
An individual contributor or stakeholder.

### Organization
A team, nonprofit, civic group, or agency.

### Resource
Something needed or available.

Examples:
- funding
- vans
- food stock
- tools
- shelter space

### Location
A geographic anchor for work.

### Decision
A recorded choice plus rationale.

### Evidence
Proof, outputs, photos, reports, links, metrics.

## Important relationships

- a Problem has many Projects
- a Project has many Tasks
- a Task can depend on other Tasks
- Tasks may require Resources
- People and Organizations can own or collaborate on Problems, Projects, and Tasks
- Problems, Projects, Tasks, and Resources may link to Locations
- Decisions can attach to Problems, Projects, or Tasks
- Evidence can attach to nearly anything

## Useful status fields

### Problem status
- proposed
- active
- monitoring
- resolved
- archived

### Project status
- planned
- active
- blocked
- completed
- cancelled

### Task status
- todo
- in_progress
- blocked
- done
- cancelled
