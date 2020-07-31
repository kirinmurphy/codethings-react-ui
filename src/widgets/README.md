
## Widgets!
View examples [here](https://eloquent-ritchie-014bec.netlify.app/)

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