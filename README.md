# Intersection Observer Animation

This code demonstrates how to use the Intersection Observer API to create dynamic animations and effects on HTML elements with specific data attributes. The code defines CSS styles and applies them to elements when they enter the viewport. It allows you to control the speed and direction of animations using data attributes.

## Features

- Animations triggered by element visibility in the viewport.
- Support for three types of animations: up, down, and fade-opacity.
- Customizable animation speed using the `data-observe-vitess` attribute.
- Ability to reverse animations using the `data-observe-forwards` attribute.
- Maintains SEO-friendly hidden text.

## Usage

1. Include the JavaScript code in your HTML document.
   - CDN : <script src="https://cdn.jsdelivr.net/gh/agaoubouzi/observe/script.js"></script>
   - NPM : npm i char-observe

3. Define your HTML elements with the `data-observe` attribute and specify the animation type and speed using the `data-observe-vitess` attribute. For example:

   ```html
   <h3 data-observe="down" data-observe-vitess="2">
   <h2 data-observe="up" data-observe-vitess="1.3">
   <div data-observe="fade-opacity" data-observe-vitess="1" data-observe-forwards="true">

Notes
- The data-observe-vitess attribute allows you to set the animation speed between 0 and 3, with 1 as the default value.
- The data-observe-forwards attribute reverses animations when elements exit the viewport.
- Make sure to maintain the hidden, SEO-friendly text by setting the desired content in your HTML.
