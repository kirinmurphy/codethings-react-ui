
## Widgets!
View [demo examples](https://reactui.codethings.net)
### LoadingIcon
```
<LoadingIcon />
```

### BrowserBackLink
```
<BrowserBackLink />
```

### Ellipticizer
```
<Ellipticizer width={'150px'}>content too long for the row</Ellipticizer>
```

### CenterTextEllipticizer
```
<CenterTextEllipticizer rawText={variedLengthTextString} />
```
when the text is a bit wider than the container, will render `Beginning of text, middl...ext, end of text.`    

### Markdownizer
Just a wrapper for `<ReactMarkdown />` component with some hard coded presets.  Not meant for unsanitized user content.
```
<Markdownizer source={source}>
```

### CommaSeparatedList
```
<CommaSeparatedList 
  title="Optional List Title"
  collection={["Item 1", "Item 2", "[MarkdownLink](http://markdownlinkurl.com)"]} 
/>
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

### DragAndDropList 
```
<DragAndDropList 
  collection={["item1", "item2", "item3"]}
  itemTemplate={(index, listItem) => (
    <div className="list-item-wrapper">
      <span className="index">{index+1}.</span>
      <div className="text-wrapper">
        <CenterTextEllipticizer rawText={listItem} />
      </div>
    </div>
  )}
  onAfterReordered={reorderedCollection => {
    // this is triggered after the collection is updated, 
    // but does not wait for the DOM to finish re-rendering
    console.log('reordered complete!');
    console.log('updated collection: ', reorderedCollection);
  }}
/>
```
add/override styles for the moving pieces with the classes 
`dragging` and `being-hovered`

### Multimediaizer
Display an image slideshow, iframe, or video with chapter navigation.       

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
    { startTime: '0:00', title: 'Chapter 1' },
    { startTime: '5:00', title: 'Chapter 2' }
  ]
};

<Multimediaizer {...videoProps} />
```
If the first chapter start time is not '0:00', an un-titled starting chapter will be added to the collection.

#### Slideshow:
```
const slideshowProps = {
  type: "slideshow"
  slideshow: {
    images: [
      'path-to-image1.jpg',
      'https://www.site.com/image-file.png'
    ]
  }
};

<Multimediaizer {...slideshowProps} />
```

Optionally change the delay between slides
```
const slideshowProps = {
  type: "slideshow"
  slideshow: {
    images: [...],
    autoAdvanceDelay: 10000 // in ms
  }
};

autoAdvanceDelay: null // will turn off the autoAdvance setting
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
