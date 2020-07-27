
### marquee
Each project can include a marquee displaying an image slideshow, iframe, or video with chapters.       

#### Slideshow:
```
marquee: {
  type: 'slideshow',
  images: [
    'path-to-image1.jpg',
    'https://www.site.com/image-file.png'
  ]
}
```
#### Video: 
```
marquee: {
  type: 'video',
  sources: [
    { src: 'path-or-url-to-video-file.mp4', type: 'video/mp4' },
    { src: 'path-or-url-to-video-file.webm', type: 'video/webm }
  ],
  poster: 'image-file-displayed-before-video-loaded.png',
  chapters: [
    { startTime: '0:00', title: 'Chapter 1' },
    { startTime: '4:30', title: 'Chapter 2' }
  ]
}
```
at lead one `source` required   
`poster` and `chapters` are optional

#### Iframe
Displays main project site in iframe window
```
url: 'https://main-project-url.com',
marquee: {
  type: 'iframe'
}
```