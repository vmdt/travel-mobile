<p align="center">
  <img src="https://res.cloudinary.com/dxrygyw5d/image/upload/c_scale,h_134,w_200/v1709968499/travelife-logo_uf55mo.png" alt="Travelife-logo"/>
</p>

## Travelife Mobile
Travelife Mobile is built using Javascript, Redux, and React Native. It uses Expo, that is a framework that makes developing Android and iOS apps easier.

### Setup
This project uses React Native. For first time set up, inside the /travel-mobile folder, run:
```bash
  npm install && npm start
```

To start project run the below. You will additionally need a device (real or virtual), and run either the Android or iOS with Expo Go. You can scan QRCode when expo start.

### Config BASE_URL

In this project, you need to use an API server to make necessary API calls. First, you need to clone the API server and run it.

Source BE: [Travelife-be](https://github.com/vmdt/travel-booking-api)

The next step is to access the ```/constants/api.js``` file and change the ```BASE_URL```. It should look like this: ```http://your_local_ip:4001/api/v1```.

Alternatively, you can use ngrok to host your server online and use the generated URL.


### Demo
Some images about travelife applicataion:

<p align="center">
  <img src="https://res.cloudinary.com/dzhl9oxog/image/upload/v1732758512/Screenshot_2024-11-15_212159_fuixqk.png" alt="Travelife-logo"/>
  <img src="https://res.cloudinary.com/dzhl9oxog/image/upload/v1732758512/Screenshot_2024-11-15_212216_jttemp.png" alt="Travelife-logo"/>
</p>
