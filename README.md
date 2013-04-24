Scrollmarker
============

Keep track of your position when scrolling through a page

Why use it?
===========

Imagine that interesting blogpost that you started reading but couldn't finish in one read? Don't do that to your readers! Scrollmarker keeps track of where you stopped by updating your address bar as you read.
Use that url next time you visit the blogpost and continue where you left!

![preview image](http://preview.bytelogic.be/scrollmarker/assets/preview.png)

How to use it?
==============

Include `scrollmarker.js` at the bottom of your page and tell it which elements it should track by calling scrollmarker with any CSS selector. i.e. `scrollmarker('h1, h2, h3')`

```html
<script src="scrollmarker.js"></script>
<script>scrollmarker('h1, h2, img');</script>
```

*Note: the more elements are matched by the selector, the more detailed but also slower the tracking will be*
*Note: elements without an id attribute will be given one based on element's contents*

Example
=======

Full example at http://preview.bytelogic.be/scrollmarker/#

````html
<!DOCTYPE html>
<html lang="en">
<body>
    <h1>My blog title</h1>
    ...
    <script src="scrollmarker.js"></script>
    <script>scrollmarker('h2, img');</script>
</body>
</html>
````
