# Treadle mobile application
Our mobile application enables users to ride a real bike and get tokens in exchange. In the application users are able to mint, view and utilize NFTs to get the tokens ("ride the bike"). Rides are being monitored by an optimized AI-model, which analyses the incoming data from sensors and decides whether the user has travelled with bike or not.

## User manual

### Marketplace
In the marketplace user can mint bike NFT's, which will be available in their wallet. If user has at least one bike, they will be able to "ride" it by choosing it in the garage and beginning the ride. User is able to see the detailed characteristics (durability, ware, efficiency and comfort) of a bike in the wallet ("Collectibles" tab).

### Garage
In the garage user can choose the bicycle by spinning the carousel. To use selected bike, user has to press the "ride" button, which initializes the ride and navigates user to the ride screen, where user can see such stats as elapsed time, AI-approved travelled distance, current speed, energy level and amount of eraned tokens. After the ride (either when the user runs out of energy or durability or when they end it on purpose) user is navigated to the summary screen, where they can see how much they travelled, how much tokens they earned and elapsed time.

### Wallet
In the wallet user is able to see their current $SCRW and $TRDL balance and the USD equivalent ("Balances" tab), as well as available bike NFTs ("Collectibles" tab). Tapping an NFT in the wallet will navigate the user to the details screen, where the user will be able to see the NFT details.

## Tech stack

- React Native
(Used to create the native app in javascript)

- Expo
(Used to ease the development process)

- Tensorflow.js
(AI inference)

- Zustand
(Handy library for React state management)

