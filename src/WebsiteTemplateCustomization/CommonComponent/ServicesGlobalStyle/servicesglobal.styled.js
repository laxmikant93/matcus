import { createGlobalStyle } from 'styled-components'

const ServicesGlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

  * {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  outline: 0;
  -webkit-tap-highlight-color: transparent;
  scroll-behavior: smooth;
}

html,
body,
div,
span,
applet,
object,
// iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
// embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
}

html * {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
}

:before,
:after {
  content: "";
  position: absolute;
  left: 0;
  width: 0;
  transition: all 0.25s ease;
}

html {
  scroll-behavior: smooth;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}

i {
  
}

/***content selection***/


/***close content selection***/

body {
  background: ${({ theme }) => theme.Global.body.bodyBackground};
  font-family:  ${({ theme }) => theme.Global.body.bodyFont};
  font-size:  ${({ theme }) => theme.Global.body.bodyFontSize};
  font-weight:  ${({ theme }) => theme.Global.body.bodyFontWeight};
  color:  ${({ theme }) => theme.Global.body.bodyColor};
  letter-spacing:  ${({ theme }) => theme.Global.body.bodyLetterSpacing};
  overflow-x: hidden;
  min-height: ${({ theme }) => theme.Global.body.bodyMinHeight};
}
 
video {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: auto;
}


.img-fluid {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: auto;
}




/***start scrollbar***/
/ width /
::-webkit-scrollbar {
  width: ${({ theme }) => theme.Global.scrollbar.scrollbarWidth};
}

/ Track /
::-webkit-scrollbar-track {
 background: ${({ theme }) => theme.Global.scrollbar.scrollbarTrackBackground}!important;
border-radius: ${({ theme }) => theme.Global.scrollbar.scrollbarThumbBorderRadius};
}
 
/ Handle /
::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.Global.scrollbar.scrollbarThumbBackground}!important; 
  border-radius: ${({ theme }) => theme.Global.scrollbar.scrollbarThumbBorderRadius};
}

/ Handle on hover /
::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.Global.scrollbar.scrollbarThumbBackgroundHover}!important; 
}
/***close scrollbar***/


ul {
  margin: 0;
  padding: 0;

  li {
    list-style: none;
  }
}

`

export default ServicesGlobalStyle