/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />

figma.showUI(__html__);
figma.ui.resize(400, 500);

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
