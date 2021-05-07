# figma-plugin-react-template

Ever wish it was as easy to build a Figma plugin as it is to build a website? Well no look no further! This template will allow you to develop your Figma plugin in your favourite browser while interacting with the Figma app. Use your favourite browser extensions such as React Developer Tools to help debug your issues faster, and take advantage of the built in hot-reloading to preview your changes instantaneously without having to constantly rebuild and relaunch your plugin.

![Screen Recording 2021-05-05 at 03 46 11 PM](https://user-images.githubusercontent.com/7476817/117219079-5c0f6580-adb9-11eb-9cfd-6e803d93e3ca.gif)
![Screen Recording 2021-05-05 at 03 45 16 PM](https://user-images.githubusercontent.com/7476817/117219001-32563e80-adb9-11eb-839d-d8cde22e5dd1.gif)

## Quickstart

1. `yarn`
2. `yarn preview:plugin`
3. In Figma load your plugin by right-clicking `Plugins > Development > New Plugin`, and select the project's `manifest.json` file:
<img src="https://user-images.githubusercontent.com/7476817/117482170-da364e00-af18-11eb-87ad-479d63c4ea7c.png" width="600"><img src="https://user-images.githubusercontent.com/7476817/117482189-df939880-af18-11eb-87ea-9fd11738b8f5.png" width="600">
4. In another window run `yarn preview:browser` 

4. To run the React app inside of Figma, run `yarn build:watch`

## How it works

Figma plugins interact with a Figma document by passing messages between the Figma app, and the plugin:
![image](https://user-images.githubusercontent.com/7476817/117206661-f9619e00-ada7-11eb-8f07-2bea23a2f355.png)

By adding a middleman between the two, we can decouple Figma and a plugin, so that we can build plugins outside of Figma, while still having access to the Figma sandbox. In this case, we run utilize a [websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) server to forward messages between the Figma sandbox and the plugin being developed. Depending on the build commands run, the React app is built differently. Your React app is wrapped inside of a  'Preview App' component to render the plugin in a browser and to handle the message proxying logic to our websocket server. In Figma we run the 'Preview App' by itself to handle interacting message proxying and handling with the Figma sandbox. 

![image](https://user-images.githubusercontent.com/7476817/117206636-f36bbd00-ada7-11eb-8f40-12ef474ce92b.png)


## Troubleshooting
- Ensure that only a *single* instance of the 'Preview App' is running in your browser and Figma. Multiple instances, can cause an infite feedback loop of messaages to occur.
- The indicator light on the 'Preview App' will turn red if the connection to the websocket server goes down. It will turn green once it reconnects
- If you wish to make changes to the 'preview-server.js' you will need to stop and rerun `yarn preview:browser` 
