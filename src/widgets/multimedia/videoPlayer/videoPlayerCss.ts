import * as css from 'styled-jsx/css';

export const cssVideoVariables = css.global`
  :root {
    --video-icon-trigger-size: 1.5rem;
    --video-chapter-icon-triggers-width: 80px;
    --video-control-bar-spacer: 1rem;

    --video-cpanel-height: 3.75rem;
    --video-chapter-display-width: 200px;
    --video-chapter-flex-direction: row-reverse;
  }

  @media(max-width:630px) {
    :root {
      --video-cpanel-height: 6.5rem;
      --video-chapter-display-width: calc(100% - 30px);
      --video-chapter-flex-direction: column;  
    }
  }
`;

export const cssVideoStyles = css`
  video {
    width:100%;
    height:calc(100% - var(--video-cpanel-height));
    background:#000;
  }

  .cpanel {
    height:var(--video-cpanel-height);
    border-top:1px solid #ddd;
    transform:translateY(-6px);
    background:var(--color-dark-blue);
    color:var(--textcolor-inverted);
  }

  .cpanel :global(.loading-icon) {
    color:var(--textcolor-inverted);
  }

  .control-bar {
    display:flex;
    justify-content:space-between;
    padding:0 var(--video-control-bar-spacer);
  }

  .control-bar :global(.video-time),
  .control-bar :global(.dropdown dt) {
    font-size:var(--fontSize-bump);          
  }

  .control-bar :global(.player-controls) {
    display:inline-block;
    transform:translateY(.65rem);
  }

  .control-bar :global(.player-controls > span),
  .control-bar :global(.trigger-icon > span),
  .control-bar :global(.svg-inline--fa) {
    width:var(--video-icon-trigger-size);
    height:var(--video-icon-triggr-size);
    color:var(--textcolor-link);
  }

  .control-bar :global(.svg-inline--fa:hover) {
    color:var(--textcolor-inverted);
  }

  .primary-controls :global(.video-time) {
    display:inline-block;
    width:130px;
    transform:translateY(.2rem);
  }

  .primary-controls :global(> *:not(:last-child)) {
    margin-right:var(--video-control-bar-spacer);
  }

  .chapter-triggers-wrapper {
    display:flex;
    flex-direction:var(--video-chapter-flex-direction);
    align-items: flex-end;
    transform:translateY(.2rem);
  }

  .chapter-triggers-wrapper :global(.dropdown > dt) {
    text-align:right;
  }

  .chapter-triggers-wrapper :global(.dropdown dt span) {
    display:inline-block;
    width:var(--video-chapter-display-width);
    transform:translateY(.2rem);
  }

  .chapter-triggers-wrapper :global(.dropdown > dd) { 
    width:320px;
    box-shadow:0 0 10px #333;
    text-align:right;
  }

  .new-window-trigger {
    text-align:right;
    cursor:pointer;
  }

  @media(max-width:630px) {
    .control-bar {
      position:relative;
    }

    .primary-controls {
      position:absolute;
      z-index:10;
    }

    .chapter-triggers-wrapper {
      position:relative;
      z-index:9;
      width:100%;
      transform:translateY(.7rem);
    }

    .chapter-triggers-wrapper :global(.dropdown),
    .chapter-triggers-wrapper :global(.dropdown dt) {
      width:100%;
    }

    .chapter-triggers-wrapper :global(.dropdown) {
      transform:translateY(.4rem);
      border-top:1px solid #aaa;
    }
  }
`;
