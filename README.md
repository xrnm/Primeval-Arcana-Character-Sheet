
# Revived Interactive Character Sheet (ICS)

This interactive character sheet is intended to create a convenient and easy place to keep track of character statistics, items, attributes, experiences, and more in a digital format.

ICS automatically calculates many fields based on the rules and should eliminate the need to constantly reference rulebooks while playing to determine changes to character stats.

Finally, ICS keeps track of the weight of all items on the character and in bags/containers to keep an accurate total of character weight and make adjustments to movement.

There is a version of the tool running here:
https://ics.blacktowergames.com

## Features that are conspicuously absent

1. Carts / Strongholds / vaults etc
2. Unload warning on navigation
3. Unload Warning on new character creation
4. Adjustments on pretty much everything
5. More beautifulness in the styles


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





 


