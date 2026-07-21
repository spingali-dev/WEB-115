let v1 = 3;
let v2 = 4
// FIX 1: Removed the comment slashes (//) so the alert actually runs.
// Also replaced the undefined variable "equals" with the string "equals"
alert("3 times 4 equals " + v1 * v2);

 // This sets the general styling for the divs within the section tag using .style
            // FIX 2: Changed getElementsById (wrong - does not exist) to getElementById (correct method name - no 's')
            let section = document.getElementById("s1")
            section.style.width = "50%"
            section.style.textAlign = "center"
            section.style.fontFamily = "arial, serif"
            // FIX 3: Changed section.stlye (typo) to section.style
            section.style.fontWeight = "bold"
            section.style.fontStyle = "italic"
            section.style.fontSize = "20px"

            // Sets the customization for each individual color/div tag
			//.innerHTML is used to add content within each div tag.
			//.style.backgroundColor is used to assign a different background color to each div
			
            // RED
            // FIX 4: Changed getelementById to getElementById (capital 'E' in Element required)
            const red = document.getElementById("red")
            red.innerHTML = "RED"
            red.style.backgroundColor = "red"

            // ORANGE
            const orange = document.getElementById("orange")
            // FIX 5: Changed orange.innerhtml to orange.innerHTML (capital 'H' required)
            orange.innerHTML = "ORANGE"
            orange.style.backgroundColor = "orange"

            // YELLOW
            const yellow = document.getElementById("yellow")
            yellow.innerHTML = "YELLOW"
            yellow.style.backgroundColor = "yellow"

            // GREEN
            // FIX 6: Changed variable name from "purple" to "green" so the variable matches
            // what is used on the next two lines (green.innerHTML, green.style)
            const green = document.getElementById("green")
            green.innerHTML = "GREEN"
            green.style.backgroundColor = "green"

            // INDIGO
            const indigo = document.getElementById("indigo")
            indigo.innerHTML = "INDIGO"
            indigo.style.backgroundColor = "indigo"

            // PURPLE
            const violet = document.getElementById("violet")
            violet.innerHTML = "VIOLET"
            violet.style.backgroundColor = "violet"
