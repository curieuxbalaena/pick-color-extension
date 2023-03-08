const colorPickerBtn = document.querySelector("#color-picker")
const clearAllBtn = document.querySelector(".clear-all")
const colorList = document.querySelector(".all-colors")
const pickedColors = JSON.parse(localStorage.getItem("pickedColors") || "[]") 
const pickedColorsHTML = document.querySelector(".picked-colors")
pickedColorsHTML.classList.add("hide")

const copyColor = (elem) => {
    elem.innerText = "Copied";
    navigator.clipboard.writeText(elem.dataset.color);
    setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}
const clearAll = () => {
    pickedColors.length = 0
    localStorage.setItem("pickedColors", JSON.stringify(pickedColors))
    colorList.innerHTML = ""
    pickedColorsHTML.classList.add("hide")
}

const showColors = () => {
    if(!pickedColors.length) return
    colorList.innerHTML = pickedColors.map(color =>`
    <li class="color">
        <span class="rect" style= "background:${color}; border: 1px solid ${color == "#ffffff" ? "#ccc": color};"></span>
        <span class="value hex" data-color="${color}">${color}</span>
    </li>`).join("")
    pickedColorsHTML.classList.remove("hide")

    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
    //console.log(colorList)
}

const activateEyeDropper = async () => {
    document.body.style.display = "none";
    try{
        /// Copy color to clipboard whenever you click.
        const eyeDropper = new EyeDropper()
        const { sRGBHex} = await eyeDropper.open()
        navigator.clipboard.writeText(sRGBHex)
        
        // If color doesn't exist in pickedColor list, add it.
        if(!pickedColors.includes(sRGBHex)){
            pickedColors.push(sRGBHex)
            localStorage.setItem("pickedColors", JSON.stringify(pickedColors))
            showColors()
            //console.log(pickedColors)
        }
        
    } catch (error) {
        //console.log(error)
    }
    document.body.style.display = "block";
}
showColors()
clearAllBtn.addEventListener("click", clearAll)
colorPickerBtn.addEventListener("click", activateEyeDropper)