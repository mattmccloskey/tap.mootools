# tap.mootools
A custom tap event for MooTools + automatic click to tap conversion

#### Package Managers
````
// Bower
bower install --save tap-mootools
````
How to Use
----------
```javascript
$(el).addEvent('tap', function(e){
    // Tapped!
});
 ```

```javascript
$(el).addEvent('click', function(e){
    // if it's a touch device, this will fire on tap too!
});
 ```

If you want you can turn off click to tap conversion
```javascript
// Put this somewhere before your tap.mootools.js script
window.convertClicksToTaps = false;
```
