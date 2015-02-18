# tap.mootools
A custom tap event, and automatic click -> tap conversion.

#### Example
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