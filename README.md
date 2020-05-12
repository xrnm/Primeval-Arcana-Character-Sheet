# ODND Revived Interactive Character Sheet (ICS)

This interactive character sheet is intended to create a convenient and easy place to keep track of character statistics, items, attributes, experiences, and more in a digital format.

ICS automatically calculates many fields based on the rules and should eliminate the need to constantly reference rulebooks while playing to determine changes to character stats.

Finally, ICS keeps track of the weight of all items on the character and in bags/containers to keep an accurate total of character weight and make adjustments to movement.

There is a version of the tool running here: https://odnd-character-sheet.s3-us-west-2.amazonaws.com/index.html

## Features that are conspicuously absent

2. Turning Events
3. Mounts
4. Hirelings
5. Carts / Strongholds / vaults etc
6. Dynamically generated saving throws
7. Unload warning on navigation
8. Unload Warning on new character creation
9. Adjustments on pretty much everything
10. More beautifulness in the styles


## Developing and Deploying
#### 1: Clone the repository
`git clone git@github.com:xrnm/odnd-character-sheet.git`

#### 2:Install Node 12 and use NPM to install the Angular CLI

`npm install -g @angular/cli`

#### 3: Install Yarn and project dependencies

`npm install -g yarn`

`yarn install`

#### 4: Run the application in development mode
  
`ng serve`

Visit the application by navigating to `http://localhost:4200`

Enjoy hot reloading!

#### 5: Create a production build
`ng build`
This will create a directory called `dist` which contains the entire site. This can be hosted in an S3 bucket or any other location of your choice.

## Contributing
If you'd like to help build features and fix bugs to improve the character sheet feel free to fork it and make pull requests.

TODO: Determine a style guide and give more guidance about contributing.

## License & Copyright
#### Initial "Source available" license
Intended for use by players. Please do not distribute or use in any commercial works.

#### Copyright
Copyright 2020 Justin Edwards. All rights reserved. 





 


