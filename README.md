*currently working on migrating from Google Maps to the javascript data visualizer library, D3.

# Simple Covid Tracker 
### All data provided by the Covid Tracking Project (https://covidtracking.com/data/api)

Use the left and right arrow keys to navigate through daily visual covid updates for the continental U.S.. 
Click on a state to get specific numbers. 

##### Known bugs as of 7/14/20: 
* The map will render black if data isn't available yet for the current day.
* Due to issues reassigning element focus, a user must first click anywhere on the screen to enable key-press navigation of the daily heat map timeline.


![](https://i.imgur.com/LSHYlo3.gif)

## Table of Contents
* [Built With](#built-with)
* [Getting Started](#getting-started)
* [API Spec](#api-spec)

## Built With
* [Node](https://nodejs.org/en/docs/) - For the runtime environment
* [React](https://reactjs.org/docs/getting-started.html) - For the front end
* [Express](https://expressjs.com/en/guide/routing.html) - For the back end
* [PostgreSQL](https://www.postgresql.org/docs/) - For the database

## Getting Started

This service is supported on Node v12.16.1

Install package dependencies.

`npm install`

------

Install and start postgresql database if not already installed:
[https://www.postgresql.org/download/](https://www.postgresql.org/download/)

Fill out .envTemplate and rename to .env

Get a Google Maps api key [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

In client/dist/index.html, replace `YOUR_KEY_HERE` in the final script tag with your api key. 

---
### scripts

`build`:

Builds the webpack bundles of both client modules.

---

`seed`:

Creates a postgres database, `covid`.

Clears/creates the table `history`.

Downloads a csv of the Covid Tracking Project's historical figures, creates a modified copy of all app relevant information and imports it into the table, `history`.

---

`boot-prod`:

Starts the app server locally

---

## API Spec

`GET /data?date=NUMBER`

### Parameters:

| Query | Type |
| --- | --- |
| ?date | `Number` |

### Response:

| Field | Type |
| ----- | ---- |
| shows| `Array[Objects]`|

#### Response (array object):
| Field | Type |
| ----- | ---- |
|id| `Number`|
| date| `Number`|
| state | `String`|
| positive | `Number `|
| lastUpdateEt | `String`|
| death | `Number `|
| dataQualityGrade | `Number `|
| positiveIncrease | `Number `|


```
{
    "id": 1,
    "date": "20200709",
    "state": "AL",
    "positive": "20200709",
    "lastUpdateEt": "7/9/2020 11:00",
    "death": "1068",
    "dataQualityGrade": "B",
    "positiveIncrease":2212
}

```
