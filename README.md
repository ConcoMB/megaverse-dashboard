# Welcome to the Megaverse!

To start this project please first install it's dependencies

### `npm install`

After that you can start it by running

### `npm start`

## The app

The first screen you'll see it's a screen where you need to input your Candidate ID

After you enter it, you be redirected to a screen with two tabs: One detailing your Megaverse, and the other showing your goal.

### Your Megaverse

![Screenshot 2024-04-24 at 14 40 20](https://github.com/ConcoMB/megaverse-dashboard/assets/1123168/e9beadb0-50c8-41bd-8038-0c169cc4dbd6)

You have 3 possible actions in this screen:

#### Automatic build
You can automatically build your Megaverse to be your goal Megaverse by clicking the blue button

![Screenshot 2024-04-24 at 14 40 55](https://github.com/ConcoMB/megaverse-dashboard/assets/1123168/af831bf5-f970-4ab7-80aa-b0ad6398c424)

#### Erase all
You can delete all elements by clicking the red button

#### Manual modification
You can modify a specific item by clicking on it. A modal will pop up and you can select your desired element.

![Screenshot 2024-04-24 at 14 40 37](https://github.com/ConcoMB/megaverse-dashboard/assets/1123168/65088c18-7358-40b5-800e-0da5858033d4)

## Improvements

The API has a relatively short span of time before it rejects requests for doing too many. For the sake of this exercise, this has been resolved by delaying requests, although is not a very elegant solution. 
A more robust solution would be to build a Dispatcher, where API calls are enqueued, and it should manage the requests failures and try again.
