const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputText = document.getElementById("inputText");
const colorPicker = document.getElementById("colorPicker");
const drawButton = document.getElementById("drawButton");
const downloadButton = document.getElementById("downloadButton");

function drawCharacter() {
  const character = inputText.value.charAt(0);
  const color = colorPicker.value;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw character with selected color
  ctx.fillStyle = color;
  ctx.font = "bold 20px Arial";
  ctx.fillText(character, 2, 28);
}

function downloadColorData() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const columns = 16; // Specify the number of columns in the output file
  let colorData = "";

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i].toString(16).padStart(2, "0");
    const g = pixels[i + 1].toString(16).padStart(2, "0");
    const b = pixels[i + 2].toString(16).padStart(2, "0");
    colorData += `#${r}${g}${b}\t`;

    // Add a line break after each column is filled
    if ((i + 4) % (columns * 4) === 0) {
      colorData += "\n";
    }
  }

  const blob = new Blob([colorData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "color_data.txt";
  document.body.appendChild(a);
  a.click();

  // Clean up
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

drawButton.addEventListener("click", drawCharacter);
downloadButton.addEventListener("click", downloadColorData);
