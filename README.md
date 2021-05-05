# figma-plugin-react-template

Ever wish it was as easy to build a Figma plugin as it is to build a website? Well no look no further! This template will allow you to develop your Figma plugin in your favourite browser while interacting with the Figma app. Use your favourite browser extensions such as React Developer Tools to help debug your issues faster, and take advantage of the built in hot-reloading to preview your changes instantaneously without having to constantly rebuild and relaunch your plugin.

![Screen Recording 2021-05-05 at 03 46 11 PM](https://user-images.githubusercontent.com/7476817/117219079-5c0f6580-adb9-11eb-9cfd-6e803d93e3ca.gif)
![Screen Recording 2021-05-05 at 03 45 16 PM](https://user-images.githubusercontent.com/7476817/117219001-32563e80-adb9-11eb-839d-d8cde22e5dd1.gif)

## Quickstart

1. `yarn`
2. `yarn preview:plugin`
3. In another window run `yarn preview:browser` 

4. To run the React app inside of Figma, run `yarn build:watch`

## How it works

Normally your plugin communicates with Figma through passing messages between the Plugin and Figma app:
![image](https://user-images.githubusercontent.com/7476817/117206661-f9619e00-ada7-11eb-8f07-2bea23a2f355.png)

In preview mode you can load the plugin in your browser instead. Events generated by your app and Figma are proxied to a websocket server, and forwarded to any other connected client. This allows for bi-directional communication between your React app in the browser, and to Figma.

![image](https://user-images.githubusercontent.com/7476817/117206636-f36bbd00-ada7-11eb-8f40-12ef474ce92b.png)

With your React app running in the browser, you can leverage hot reloading and React Developer Tools to improve your Figma development experience.

## Troubleshooting
- Make sure you are only runnign one instance of the preview browser and plugin. Otherwise 
- The indicator light on the Preview App will turn red if the connection to the websocket server goes down. It will turn green once it reconnects 
![image](https://user-images.githubusercontent.com/7476817/117218993-2f5b4e00-adb9-11eb-95e5-67702fa03b90.png)
![image](https://user-images.githubusercontent.com/7476817/117207805-3bd7aa80-ada9-11eb-8427-a1e32709534c.png)
![image](https://user-images.githubusercontent.com/7476817/117207942-67f32b80-ada9-11eb-8d5f-f7857d81930d.png)

