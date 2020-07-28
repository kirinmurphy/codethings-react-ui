## Welcome to this repo!    
Definitely don't use it.  Still some kinks to work out.

Currently exhausting my options on how to get my css-in-js solution to play nice with Typescript and Rollup.    
I found a [super helpful blog post](https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/) to get Typescript working with Rollup!   
And I found another [super helpful blog](https://medium.com/@tomaszmularczyk89/guide-to-building-a-react-components-library-with-rollup-and-styled-jsx-694ec66bd2) to get Styled-JSX working with Rollup!    
But trying a bunch of ways to apply both doesn't work!  Yay technology.    

[This guy](https://github.com/vercel/next.js/issues/7595) just gave up.  Not quite there yet.      

Whatever, works great besides the big broken part.  

## Widgets!
### Ellipticizer
```
<Ellipticizer width={'200px'}>content too long for the row</Ellipticizer>
```

### CommaSeparatedList
```
<CommaSeparatedList 
  title="Optional List Title"
  collection={["Item 1", "Item 2", "[MarkdownLink](http://markdownlinkurl.com)"]} 
/>
```

### Markdownizer
Wrapper for `<ReactMarkdown />` component.
```
<Markdownizer source={source}>
```

### LoadingIcon
```
<LoadingIcon />
```

### Dropdownizer
```
<Dropdownizer 
  title={dynamicTitle || 'Static Title'}
  content={someCollection.map((item) => { 
    return <div onClick={() => doSomething()}>{item.name}}</div>;
  )}
/>
```

option to open window above trigger
```
<Dropdownizer title={...} content={...} orientation="above">
```

### Popupizer
```
const [popupState, setPopupState] = useState(false);
return (
  <button onClick={() => setPopupState(true)}>Open Popup</button>
  {popupState && <Popupizer closeAction={() => { setPopupState(false) }}>
    Popup Content
  </Popupizer>}
);
```

### Multimediaizer
Multimedia can display an image slideshow, iframe, or video with chapters.       

#### Slideshow:
```
const slideshowProps = {
  type: "slideshow"
  images: [
    'path-to-image1.jpg',
    'https://www.site.com/image-file.png'
  ]
};

<Multimediaizer {...slideshowProps} />
```

#### Video: 
at lead one `source` required   
```
const videoProps = {
  type: "video",
  video: {
    sources: [
      { src: 'path-or-url-to-video-file.mp4', type: 'video/mp4' },
      { src: 'path-or-url-to-video-file.webm', type: 'video/webm }
    ]
  }
};

<Multimediaizer {...videoProps} />
```

optional `poster` and `chapters` can be added
```
const videoProps = {
  ...
  poster: 'image-file-displayed-before-video-loaded.png',
  chapters: [
    { startTime: 0, title: 'Chapter 1' },
    { startTime: 360, title: 'Chapter 2' }
  ]
};

<Multimediaizer {...videoProps} />
```

#### getFormattedChapters: 
By default `startTime` is required in seconds. `startTime` can be written as a string in format of `'[HH.MM.]SS'` by passing the chapter config through the `getFormattedChapters` helper.
```
import { Multimediaizer, getFormattedChapters } from 'codethings-react-ui';

<Multimediaizer
  type="video"
  video={
    source: {...},
    chapters: getFormattedChapters([
      { startTime: '0:00', title: 'Chapter 1' },
      { startTime: '5:00', title: 'Chapter 2' }
    ])
  } 
/>
```

#### Iframe
Displays url in iframe window
```
const iframeProps = {
  type: "iframe"
  iframeUrl: "https://main-project-url.com"
};

<Multimediaizer {..iframeProps} />
```

#### hasMultimediaContent
If a collection of records can have optional multimedia properties, `hasMultimediaContent` will inspect object and return true if any multimedia type is present.
```
import { Multimediaizer, hasMultimediaContent } from 'codethings-react-ui';


const hasMultimedia = hasMultimediaContent(project.multimedia);
return (
  ...
  {hasMultimedia && ( 
    <div className="multimedia-container">
      <Multimediaizer {...project.multimedia} />
    </div>
  )}
);
```

## Custom Hooks
### useTriggerOverride
Hijack click or other event trigger and fire a callback if a certain condition is met

```
const [activeFileUrl, setActiveFileUrl] = useState(null);
const containerRef = useRef(null);

useTriggerOverride({ 
  eventType: 'mousedown', 
  ref: containerRef, 
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
Check if user clicked outside of a certain element 
```
useCallbackOnExternalEventTrigger(dropdownRef, () => {
  setDropdownActiveState(false);
});
```


## Help Links
### Rollup conversion
https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/
https://medium.com/@tomaszmularczyk89/guide-to-building-a-react-components-library-with-rollup-and-styled-jsx-694ec66bd2
https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency

### npm link issues
https://juliangaramendy.dev/react-typescript-library-tsdx/
https://github.com/facebook/react/issues/13991
https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be
https://stackoverflow.com/questions/57825421/invalid-hook-call-warning-linking-a-react-app-and-a-local-npm-package
https://github.com/whitecolor/yalc
https://chevtek.io/you-can-finally-npm-link-packages-that-contain-peer-dependencies/

### NPM Publish
https://zellwk.com/blog/publish-to-npm/

### Styled JSX
https://github.com/vercel/next.js/issues/7595    
https://kevinjalbert.com/jest-snapshots-reducing-styled-jsx-noise/

### PostCSS
https://nextjs.org/docs/basic-features/built-in-css-support#import-styles-from-node_modules
https://www.learnwithjason.dev/blog/learn-rollup-css/
