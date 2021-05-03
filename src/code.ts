/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />

figma.showUI(__html__);
figma.ui.resize(400, 500);
figma.ui.onmessage = async (msg) => {
  console.log('msg',msg)
  if (msg.type === "create-text") {
    const nodes = [];
    console.log('create text', msg)
    const newTextNode = figma.createText()
    await figma.loadFontAsync(<FontName>newTextNode.fontName);
    newTextNode.characters = msg.text
    newTextNode.name = 'Sample Text'
   
    figma.currentPage.appendChild(newTextNode);
     

    figma.currentPage.selection = [newTextNode];
  }
};

figma.on("selectionchange", () => {
  const selectedTextNodes = figma.currentPage.selection
    .filter(node => node.type === 'TEXT')
    .map((node: TextNode) => ({figmaNodeID: node.id, text: node.characters}))
  figma.ui.postMessage({ event: 'selected-text-nodes', nodes: selectedTextNodes})
});
