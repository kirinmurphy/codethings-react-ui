## codethings-react-ui    
This package includes re-usable UI elements for a React Typescript app including UI widgets, a starter CSS theme and a few custom hooks.   

This is a work in progress built to bootstrap my other React stuff, and should probably definitely not be used as a dependency in a real project.


## Install
```
npm install codethings-react-ui --save

- or -  

yarn add codethings-react-ui 
```

Link the CSS widget and theme styles to the project with
```
import 'codethings-react-ui/dist/styles.css';
```


## Widgets
[Widget List](https://github.com/kirinmurphy/codethings-react-ui/blob/master/src/widgets)


## Custom Hooks
### useTriggerOverride
Hijack event trigger and fire a callback if a certain condition is met.

```
const [activeFileUrl, setActiveFileUrl] = useState(null);
const containerElementRef = useRef(null);

useTriggerOverride({ 
  eventType: 'mousedown', 
  ref: containerElementRef, 
  condition: ({ eventData }) => {
    const validFileExtensions = ["pdf", "jpg", "jpeg", "gif", "png"]; 
    const urlParts = eventData.triggeredHref?.split('.');
    const possibleFileExtension = urlParts[urlParts.length-1];
    return urlParts?.length > 1 && validFileExtensions.includes(possibleFileExtension);
  },
  conditionalCallback: (eventData) => {
    setActiveFileUrl(eventData.triggeredHref);
  }
});
```
so far `eventData` includes only the `triggeredHref` prop

### useCallbackOnExternalEventTrigger
Check if trigger event happens outside of an element's boundaries.
```
const [popupActiveState, setPopupActiveState] = useState(false);
const popupRef = useRef(null);

useCallbackOnExternalEventTrigger(popupRef, () => {
  setPopupActiveState(false);
});
```


## Theme Defaults
This package includes theme defaults and some boilerplate styles.
- [reset.css](https://github.com/kirinmurphy/codethings-react-ui/blob/master/src/css/reset.css) - default reset styles
- [panel.css](https://github.com/kirinmurphy/codethings-react-ui/blob/master/src/css/panel.css) - BEM defaults for dark/light panel sections
- [_variables-theme.css](https://github.com/kirinmurphy/codethings-react-ui/blob/master/src/css/_variables-theme.css) - global default variables for color, typography, etc.  (used in widgets)
- [_variables-widgets.css](https://github.com/kirinmurphy/codethings-react-ui/blob/master/src/widgets/css/_variables-widgets.css) - default theme  for widgets       

<br>
The default variables can be changed by overriding them after the library file gets loaded.  


## How It Works
[Blog posts](https://github.com/kirinmurphy/codethings-react-ui/blob/master/helpful-links.md) that helped me get this thing to work. 
