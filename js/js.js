let trans = () => {
    console.log(document.documentElement);
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 1000);
};

const fn = getRandomInt(1000); //first num
// const op = getRandomInt(3); //operator
// const sn = getRandomInt(11); //second num
var numbersCorrectCount = localStorage.getItem('numbersCorrectCount') || '0'; //numbers the user has gotten correct
// const operators = ["plus", "minus", "times", "divide"];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const changeLang = (languageCode) => {

    localStorage.setItem('lang', languageCode);
    snackbar();
    if (sidebar.classList.toggle("close") === true) {
    } else {
        sidebar.classList.toggle("close");
    }

    document.getElementById("firstNum").innerHTML = "";
    console.log(languageCode);

    window.setTimeout(() => {
        reloadPage();
    }, 1100);

};

function snackbar() {

    var x = document.getElementById("snackbar");
    var language = localStorage.getItem('lang');

    if (language == 'ar') {
        language = "Arabic";
    } else if (language == 'bn') {
        language = "Bengali";
    } else if (language == 'zh') {
        language = "Chinese";
    } else if (language == 'en') {
        language = "English";
    } else if (language == 'fr') {
        language = "French";
    } else if (language == 'de') {
        language = "German";
    } else if (language == 'hi') {
        language = "Hindi";
    } else if (language == 'ja') {
        language = "Japanese";
    } else if (language == 'pt') {
        language = "Portuguese";
    } else if (language == 'pa') {
        language = "Punjabi";
    } else if (language == 'ru') {
        language = "Russian";
    } else if (language == 'es') {
        language = "Spanish";
    }


    x.innerHTML = "You are learning " + language;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

let isAudioPlaying = false;

function play() {
    if (isAudioPlaying) return; // Prevent overlapping audio

    //to scrool the page for mobile when the user clicks on the input
    var elmnt = document.getElementById("section2");
    if (elmnt) elmnt.scrollIntoView();

    //language is selected. default language is english
    var lang = localStorage.getItem('lang') || 'en';
    console.log(lang);
    console.log(fn);

    var path = "";

    if (fn < 10) {
        path = "./audio/" + lang + "/0" + fn + ".mp3";

    } else {
        path = "audio/" + lang + "/" + fn + ".mp3";
    }

    console.log(path);

    isAudioPlaying = true;
    const audio = new Audio(path);
    //
    // const path2 = "audio/" + lang + "/" + operators[op] + ".mp3";
    // const audio2 = new Audio(path2);
    //
    // const path3 = "audio/" + lang + "/" + sn + ".mp3";
    // const audio3 = new Audio(path3);

    audio.playbackRate = 0.90;

    // Reset flag when audio finishes or throws an error
    audio.onended = () => { isAudioPlaying = false; };
    audio.onerror = () => { isAudioPlaying = false; };

    window.setTimeout(() => {
        let playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio play failed:", error);
                isAudioPlaying = false;
            });
        }
    }, 200);


    // setTimeout(() => {
    //     audio2.play();
    // }, 1500);
    //
    // setTimeout(() => {
    //     audio3.play();
    // }, 2500);


    // document.getElementById("ans").innerHTML = fn.toString() + operators[op] + sn.toString();

}

function continueButton() {
    var operatorCheck;

    var a = document.getElementById("firstNum").value;
    // var b = document.getElementById("operator").value;
    // var c = document.getElementById("secondNum").value;
    // var d = document.getElementById("total").value;
    //
    // console.log(b);
    // if (b === "-" && operators[op] === "minus") operatorCheck = "-";
    // else if (b === "+" && operators[op] === "plus") operatorCheck = "+";
    // else if (b === "*" && operators[op] === "times") operatorCheck = "*";
    // else if (b === "/" && operators[op] === "divide") operatorCheck = "/";
    //
    // var total = a.toString()+b.toString()+c.toString();
    // console.log("Total: " + eval(total));
    //
    //
    // total = eval(total);

    if (parseInt(a) === fn) {

        correct("firstNum");

        setTimeout(() => {
            reloadPage("firstNum");
        }, 1000);

    } else {

        wrong("firstNum");

        resetInputColorIncorrect("firstNum");

    }

}

function correct(id) {
    document.getElementById(id).style.color = "#50C76F";
    localStorage.setItem('numbersCorrectCount', ++numbersCorrectCount);

    //  document.getElementById("numbersCorrect").innerHTML = localStorage.getItem('numbersCorrectCount');
    console.log(localStorage.getItem('numbersCorrectCount'));

}

function wrong(id) {
    document.getElementById(id).style.color = "red";
    document.getElementById("inputInfo").style.color = "red";
    document.getElementById("inputInfo").style.color = "Try again";

}

function resetInputColorIncorrect(id) {
    document.getElementById(id).style.color = '';
    document.getElementById(id).value = document.getElementById(id).defaultValue = '';

    document.getElementById("inputInfo").style.color = "red";
    document.getElementById("inputInfo").innerHTML = "Try again";
}

function reloadPage(id) {

    window.location.reload(false);

}

function showAnswer() { // no ';' here

    document.getElementById("answer").innerHTML = fn + " = " + numberToWords(fn);

    var x = document.getElementById("hint");
    x.style.display = "block";

}

//public static ArrayList<Integer> integerToTriplets(int number) {

function integerToTriplets(number) {

    var tripletsArray = new Array();

    while (number > 0) {

        var triplets = Math.floor(number % 1000);
        tripletsArray.push(triplets);
        console.log("triplets: " + triplets);
        number = Math.floor(number / 1000);

    }
    console.log(tripletsArray);
    return tripletsArray;
}

//Numbers to words in arabic
//Numbers to words in bengali
//Numbers to words in Chinese
//Numbers to words in english
if (localStorage.getItem('lang') !== '') {


    var numberToWords = function (num) {
        if (num === 0) return 'Zero'

        let finalString = [];

        [...numberToWordMap.keys()].reverse().map(key => {
            if (num >= key) {
                if (key >= 100) {
                    const numberOfTimesKeyFitsNum = Math.floor(num / key);
                    const number = memoize[numberOfTimesKeyFitsNum] ? memoize[numberOfTimesKeyFitsNum] : numberToWords(numberOfTimesKeyFitsNum);
                    if (!memoize[numberOfTimesKeyFitsNum]) memoize[numberOfTimesKeyFitsNum] = number;

                    finalString.push(number + ' ' + numberToWordMap.get(key) + ' ')
                } else {
                    finalString.push(numberToWordMap.get(key) + ' ')
                }

                num = num % key;
            }
        });

        finalString = finalString.join('');

        return finalString.slice(0, finalString.length - 1);
    };

    let memoize = {};

    let numberToWordMap = new Map();
    numberToWordMap.set(1, 'One')
    numberToWordMap.set(2, 'Two')
    numberToWordMap.set(3, 'Three')
    numberToWordMap.set(4, 'Four')
    numberToWordMap.set(5, 'Five')
    numberToWordMap.set(6, 'Six')
    numberToWordMap.set(7, 'Seven')
    numberToWordMap.set(8, 'Eight')
    numberToWordMap.set(9, 'Nine')
    numberToWordMap.set(10, 'Ten')
    numberToWordMap.set(11, 'Eleven')
    numberToWordMap.set(12, 'Twelve')
    numberToWordMap.set(13, 'Thirteen')
    numberToWordMap.set(14, 'Fourteen')
    numberToWordMap.set(15, 'Fifteen')
    numberToWordMap.set(16, 'Sixteen')
    numberToWordMap.set(17, 'Seventeen')
    numberToWordMap.set(18, 'Eighteen')
    numberToWordMap.set(19, 'Nineteen')
    numberToWordMap.set(20, 'Twenty')
    numberToWordMap.set(30, 'Thirty')
    numberToWordMap.set(40, 'Forty')
    numberToWordMap.set(50, 'Fifty')
    numberToWordMap.set(60, 'Sixty')
    numberToWordMap.set(70, 'Seventy')
    numberToWordMap.set(80, 'Eighty')
    numberToWordMap.set(90, 'Ninety')
    numberToWordMap.set(100, 'Hundred')
    numberToWordMap.set(1000, 'Thousand')
    numberToWordMap.set(1000000, 'Million')
    numberToWordMap.set(1000000000, 'Billion')

}

//Numbers to words in french
if (localStorage.getItem('lang') === 'fr') {

    var numberToWords = function (input) {

        const frenchMegas = ["", "mille", "million", "milliard", "billion", "billiard", "trillion", "trilliard", "quadrillion", "quadrilliard", "quintillion", "quintilliard"];
        const frenchUnits = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
        const frenchTens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];
        const frenchTeens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];

        let words = " ";

        if (input < 0) {
            words += "moins ";
            input *= -1;
        }

        var triplets = integerToTriplets(input);

        if (triplets.length == 0) {
            return "zéro ";
        }

        for (var idx = triplets.length - 1; idx >= 0; idx--) {
            var triplet = triplets[idx];
            //log.Printf("Triplet: %d (idx=%d)\n", triplet, idx)

            // nothing todo for empty triplet
            if (triplet == 0) {
                break;
            }

            // special cases
            if (triplet == 1 && idx == 1) {
                words += "mille ";
                continue;
            }

            // three-digits
            var hundreds = Math.floor(triplet / 100 % 10);
            var tens = Math.floor(triplet / 10 % 10);
            var units = Math.floor(triplet % 10);
            //log.Printf("Hundreds:%d, Tens:%d, Units:%d\n", hundreds, tens, units)
            if (hundreds > 0) {
                if (hundreds == 1) {
                    words += " cent ";
                } else {
                    if (tens == 0 && units == 0) {
                        words += frenchUnits[hundreds] + " cents ";
                        //goto tripletEnd
                        break;
                    } else {
                        words += frenchUnits[hundreds] + " cent ";
                    }
                }
            }

            if (tens == 0 && units == 0) {
                //			goto tripletEnd
                break;
            }

            switch (tens) {
                case 0:
                    words += frenchUnits[units] + " ";
                    break;
                case 1:
                    words += frenchTeens[units] + " ";
                    break;
                case 7:
                    switch (units) {
                        case 1:
                            words += frenchTens[tens] + " et " + frenchTeens[units] + " ";
                            break;
                        default:
                            let word = frenchTens[tens] + "-" + frenchTeens[units] + " ";
                            words += word;
                            break;
                    }
                    break;
                case 8:
                    switch (units) {
                        case 0:
                            words += frenchTens[tens] + "s" + " ";
                            break;
                        default:
                            let word = frenchTens[tens] + "-" + frenchUnits[units];
                            words += word;
                            break;
                    }
                    break;
                case 9:
                    let word = frenchTens[tens] + "-" + frenchTeens[units];
                    words += word;
                    break;
                default:
                    switch (units) {
                        case 0: {
                            words += frenchTens[tens] + " ";
                            break;
                        }
                        case 1: {
                            words += frenchTens[tens] + " et " + frenchUnits[units] + " ";
                            break;
                        }
                        default: {
                            let word = frenchTens[tens] + "-" + frenchUnits[units];
                            words += word;
                            break;
                        }
                    }
                    break;
            }


            let mega = frenchMegas[idx];
            if (mega != "") {
                if (mega != "mille" && triplet > 1) {
                    mega += "s";
                }
                words += mega + " ";
            }
        }

        console.log(words);
        return words.substring(0, 1).toUpperCase() + words.substring(1);

    }
}

//Numbers to words in german
if (localStorage.getItem('lang') === 'de') {

    var numberToWords = function (input) {
        const deMegasSingular = ["", "eintausend", "eine Million", "eine Milliarde", "eine Billion", "eine Billiarde", "eine Trillion", "eine Trilliarde", "eine Quadrillion", "eine Quadrilliarde", "eine Quintillion", "eine Quintilliarde", "eine Sextillion", "eine Sextilliarde", "eine Septillion", "eine Septilliarde"]
        const deMegasPlural = ["", "tausend", "Millionen", "Milliarden", "Billionen", "Billiarden", "Trillionen", "Trilliarden", "Quadrillionen", "Quadrilliarden", "Quintillionen", "Quintilliarden", "Sextillionen", "Sextilliarden", "Septillionen", "Septilliarden"]
        const deUnits = ["", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"]
        const deTens = ["", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"]
        const deTeens = ["zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"]

        let words = "";

        if (input < 0) {
            words += "minus ";
            input *= -1;
        }

        // split integer in triplets
        var triplets = integerToTriplets(input);

        // zero is a special case
        if (triplets.length == 0) {
            return "null";
        }

        // iterate over triplets
        for (var idx = triplets.length - 1; idx >= 0; idx--) {
            var triplet = triplets[idx];

            // nothing to do for empty triplet
            if (triplet == 0) {
                continue;
            }

            var mega = "";
            if (triplet == 1 && idx != 0) { // handle singular megas
                mega = deMegasSingular[idx];

                if (idx > 1) { // Million and above, megas need separator
                    mega = " " + mega + " ";
                }

                words += mega;
                continue;
            }

            mega = deMegasPlural[idx];

            if (idx > 1) { // Million and above, megas need separator
                mega = " " + mega + " ";
            }

            // three-digits
            var hundreds = Math.floor(triplet / 100 % 10);
            var tens = Math.floor(triplet / 10 % 10);
            var units = Math.floor(triplet % 10);
            if (hundreds == 1) {
                words += "einhundert ";
            } else if (hundreds > 0) {
                words += deUnits[hundreds] + "hundert";
            }

            if (tens == 0 && units == 0) {
                break;
            }

            switch (tens) {
                case 0:
                    words += deUnits[units];
                    break;
                case 1:
                    words += deTeens[units];
                    break;
                default:
                    if (units == 1) {
                        var word = "einund" + deTens[tens];
                        words += word;
                    } else if (units > 0) {
                        var word = deUnits[units] + "und" + deTens[tens];
                        words += word;
                    } else {
                        words += deTens[tens];
                    }
                    break;
            }


            if (mega != "") {
                words += mega;
            }
        }

        var joint = words + "";
        var paddingFix = joint.trim();

        return paddingFix;
    }
}
//Numbers to words in Hindi
//Numbers to words in italian
if (localStorage.getItem('lang') === 'it') {


}
//Numbers to words in japanese
//Numbers to words in Portuguese
//Numbers to words in Punjabi
//Numbers to words in russian
//Numbers to words in Spanish

window.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure the UI is fully painted before audio fires
    setTimeout(() => {
        play();
        var inputField = document.getElementById('firstNum');
        if (inputField) {
            inputField.focus();
        }
    }, 500);
});
