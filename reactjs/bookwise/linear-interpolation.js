/* 
  Linear interpolation 
  for finding drawer's width based on viewport width
*/

// Minimum screen size where the drawer takes 84vw
const minScreenSize = 320

// Maximum screen size where the drawer width will be calculated
const maxScreenSize = 1200 // 1440?

// Percentage of viewport width for xxl screens (1200px)
const minViewportWidth = 45.8333

// Target percentage of viewport width for screens up to md (576px)
const maxViewportWidth = 84

// Current viewport width
const viewportWidth = 320 // change here

const percentage =
  ((viewportWidth - minScreenSize) / (maxScreenSize - minScreenSize)) *
    (minViewportWidth - maxViewportWidth) +
  maxViewportWidth

const drawerWidth = `${percentage}vw`

// The calculated width for the drawer in the desired viewport width
console.log(drawerWidth)

// 1440px  | 1200px
// ----------------
// 84vw
// 75.28vw | 72.90vw
// 68.73vw | 64.57vw
// 61.73vw | 54.86vw
// 45.82vw
