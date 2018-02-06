# Angular 5 CRUD Mat-Table Routing

Angular 5 Material 2 Data Table with: 
- CRUD (Create, Read, Update, Delete)
- use API to return Server-Side Pagination, Filtering, Sorting results
- multi-page routed sample application 

## Screenshots

Code in action:

![preview](https://github.com/Amaster-eu/Ang5-CRUD-Mat-Table/blob/master/src/assets/demo.gif)

## Installation

> **Node.js** and the package manager **npm** should be installed. If not: [nodejs.org](https://nodejs.org/en/).

- Open Terminal.
- `cd /YOUR-FOLDER` - change the current working directory to the location where you want the cloned directory to be made.
- `git clone https://github.com/Amaster-eu/Ang5-CRUD-Mat-Table` - clone current repository.
- `cd Ang5-CRUD-Mat-Table` - go to the project folder.
- `npm install`- installing dependent packages.

## Usage

The app can work in one of the modes:
- the mode of working with a real database and json-server - viewing, creating, editing and deleting records with appropriate changes in the database
- mode of operation with fake REST server - receiving data and simulating the creation, editing and deletion of records

## Mode json-server

- `npm run dev`- start dev json-server at the address [http://localhost:4200/](http://localhost:4200/).

The setting of this mode is done in a file `src/environments/environment.ts`, parameter **useMockApi: false** 
```
export const environment = {
  production: false,
  useMockApi: false
};

```

## Mode fake REST server

- `npm run start`- start project at the address [http://localhost:4200/](http://localhost:4200/).

The setting of this mode is done in a file `src/environments/environment.ts`, parameter **useMockApi: true** 
```
export const environment = {
  production: false,
  useMockApi: true
};

```
Use API to return Server-Side Pagination, Filtering, Sorting results and imitating the creation, editing and deletion of records.

## Build

- `ng build`- to build the project (if it's needed). The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

The project in further development to improve.

**[⬆](#top)**
