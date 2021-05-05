/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />

const PREVIEW_ENV = process.env.PREVIEW_ENV


figma.showUI(__html__);

if (PREVIEW_ENV === 'figma') {
  figma.ui.resize(300, 200);
} else {
  figma.ui.resize(400, 400);
}

const getSelectedNodes = () => {
  const selectedTextNodes = figma.currentPage.selection
    .filter(node => node.type === 'TEXT')
    .map((node: TextNode) => ({figmaNodeID: node.id, text: node.characters}))
  figma.ui.postMessage({ event: 'selected-text-nodes', nodes: selectedTextNodes})
}

figma.ui.onmessage = async (msg) => {

  if (msg.type === "create-text") {
    const newTextNode = figma.createText()
    await figma.loadFontAsync(<FontName>newTextNode.fontName);
    newTextNode.characters = msg.text
    newTextNode.name = 'Sample Text'
   
    figma.currentPage.appendChild(newTextNode);
     

    figma.currentPage.selection = [newTextNode];
  }
  if (msg.type === 'update-text') {
    const textNode = <TextNode>figma.getNodeById(msg.figmaNodeID)
    await figma.loadFontAsync(<FontName>textNode.fontName);
    textNode.characters = msg.text
    getSelectedNodes()
  }
};

figma.on("selectionchange", () => getSelectedNodes());
