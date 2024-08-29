import inquirer from 'inquirer';
import qr from "qr-image"
import fs from "fs"

inquirer
    .prompt([
        {
            type: 'input',
            message: 'Type in your URL:',
            name: 'URL'
        }
    ])
    .then((answers) => {
        const url = answers.URL;
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('qr_img.png'));

        fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          });
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });




var svg_string = qr.imageSync('I love QR!', { type: 'svg' });

