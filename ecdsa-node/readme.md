## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

Private key:  c9e0022b70e5eca2f8718a9c165855005515c938da4596eabe6dcd1d339e5d1a
Public key:  04df6b5e395698d730d180aa4a2a277d59208a08209ce58a715a2d4fc729a41cc340b1421b53709596eaf86e5b4387eb74f17b0f5c214d8e53321b278ab79d601c
Address:  bce019cd1f1c383d0ede5ea7cc6d69cd10c5e3f9


Private key:  6743e223d05958d0a198aca2349b424ff2828a46f78d617af1802a914fd8332c
Public key:  044b9e617afd0c1fd49ee5b1cdf47d44943550dd7acb05fbc7f1ea905962c2409306d7adf10625eddd770c78edb6b9d917108cf5b1055ed826c3ceedec2c2171f0
Address:  6510b36b837e8f08b00ccd820f82931e8f1545f6


Private key:  a14c949f8b57b1068e03d1e1f0f66f5fb6905b3bd148ac18370cbe67d497f55f
Public key:  04e2c44885bbc0e907abb6c2e2d7cbaead71c6e872f51f7c9c666bc46bccb7bd14bfc647d0dbcb3698c1b940aff3676ea4ed661c49666f3fb75286011eea9263d7
Address:  8f40ba8b246f5eaa7b6548cab64d4f345a548002