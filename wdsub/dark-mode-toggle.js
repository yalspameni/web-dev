let topDiv = document.getElementById("top-div");
let lowDiv = document.getElementById("low-div");

 let isLight = true;

function mngMode(event) {
  
 // Change background color to black if light mode, else white
      
  if (isLight) document.body.style.backgroundColor = "black";
  else document.body.style.backgroundColor = "white";
  
 // Change text color to white if light mode, else black
 
  if (isLight) document.body.style.color = "white" ;
  else document.body.style.color = "black" ; 
  
 // Change text to "dark mode on" if light mode, else "dark mode off"
 
  if (isLight) lowDiv.innerHTML = "<p>Dark mode on</p>";
  else lowDiv.innerHTML = "<p>Dark mode off</p>";
    
 // Flip the isLight switch
    
    isLight = !isLight;  
  
}
