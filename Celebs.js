window.addEventListener('load', function () {

    document.querySelector("#anagramQuerySelect").addEventListener("change", function (el) {
        document.querySelector("#title h1").innerText = el.target.value + " Anagram Finder";

        //select the resultDivContainer element and empty it
        document.querySelectorAll(".resultDivContainer").forEach(function (ele) {
            ele.innerHTML = "";
        });

        if(document.querySelector("#anagramQuerySelect").value === "General"){

            document.getElementById("anagramInput").style.display = "none";
                        ///////////////////
                        //Write to DOM
                        //////////////////
                        let resultDivContain = document.createElement("div");

                        resultDivContain.className = "resultDivContainer";
                        let resultDiv = document.createElement("div");
                        //console.log(resultDiv)
                        resultDiv.className = "row text-justify resultEle";
                        let resulth4 = document.createElement("h4");
                        resulth4.className = "mx-auto";

                        //Write the value of the anagram to the h4 on the page
                        resulth4.innerText = "This feature is not ready yet.";
                        //append div and h4 to end of body
                        document.querySelector(".container.my-5").appendChild(resultDivContain).appendChild(resultDiv).appendChild(resulth4)

        } else {            document.getElementById("anagramInput").style.display = "flex";
    }

    });

    let anagram = "";

    if (document.querySelector("#anagramQuerySelect").value === "Celebrities") {

        let celebAnagramFinder = function () {
            //select the resultDivContainer element and empty it
            document.querySelectorAll(".resultDivContainer").forEach(function (el) {
                el.innerHTML = "";
            });

            //write input value to anagram variable
            if (document.querySelector("#anagram").value.toUpperCase().includes(",")) {
                //Create array from comma seperated anagram
                anagram = document.querySelector("#anagram").value.toUpperCase().replace(/\s/g, '').split(',');

                anagram.forEach(function (val, index) {
                    anagram[index] = val.replace(/[^A-Z]/g, "");
                })
                // console.log(anagram)
            } else {
                //Place Anagram into Array
                anagram = [document.querySelector("#anagram").value.toUpperCase().replace(/\s/g, '')]

                anagram.forEach(function (val, index) {
                    anagram[index] = val.replace(/[^A-Z]/g, "");
                })
            };

            //console.log(anagram)

            //Bypass CORS
            let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
                targetUrl = 'https://celebritybucks.com/developers/export/JSON'



            //Fetch the json of celebs
            fetch(proxyUrl + targetUrl).then(function (res) {

                if (res.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        res.status);
                    return;
                }

                res.json().then(function (celebsFromApi) {

                    // celebsFromApi = {CelebrityValues: [{ name: "Serena Williams" },{ name: "Kacey Musgraves" }, { name: "Ivana Milicevic" } ] };
                    //debugger;
                    // console.log("Celebs from API", celebsFromApi.CelebrityValues)
                    let obj = {};
                    //Anagram to search for
                    /* var anagram = ["TRUMCDONALD", "SHAVERSINB", "SHAVERSINC", "SHAVERSINM", "SHAVERSINP", "HASTYMAREA", "HASTYMAREE", "HASTYMAREI",
                         "HASTYMAREL", "HASTYMAREN", "HASTYMAREO", "HASTYMARER", "HASTYMARES", "HASTYMARET", "HASTYMAREU", "SLIMSWINEAREAA",
                         "SLIMSWINEAREAE", "SLIMSWINEAREAI", "SLIMSWINEAREAL", "SLIMSWINEAREAN", "SLIMSWINEAREAO", "SLIMSWINEAREAR", "SLIMSWINEAREAS",
                         "SLIMSWINEAREAT", "SLIMSWINEAREAU", "ROTTENGROANA", "ROTTENGROANE", "ROTTENGROANI", "ROTTENGROANL", "ROTTENGROANN", "ROTTENGROANO",
                         "ROTTENGROANR", "ROTTENGROANS", "ROTTENGROANT", "ROTTENGROANU", "GRIMERTABOOB", "GRIMERTABOOC", "GRIMERTABOOM", "GRIMERTABOOP", "PUTINKARMAF",
                         "PUTINKARMAH", "PUTINKARMAV", "PUTINKARMAW", "PUTINKARMAY", "SLOTHMENWAILA", "SLOTHMENWAILE", "SLOTHMENWAILI", "SLOTHMENWAILL", "SLOTHMENWAILN",
                         "SLOTHMENWAILO", "SLOTHMENWAILR", "SLOTHMENWAILS", "SLOTHMENWAILT", "SLOTHMENWAILU", "BENLAIDLAWB", "BENLAIDLAWC", "BENLAIDLAWM", "BENLAIDLAWP",
                         "ONEMUTTISLANDA", "ONEMUTTISLANDE", "ONEMUTTISLANDI", "ONEMUTTISLANDL", "ONEMUTTISLANDN", "ONEMUTTISLANDO", "ONEMUTTISLANDR", "ONEMUTTISLANDS",
                         "ONEMUTTISLANDT", "ONEMUTTISLANDU", "JEDIMATHSA", "JEDIMATHSE", "JEDIMATHSI", "JEDIMATHSL", "JEDIMATHSN", "JEDIMATHSO", "JEDIMATHSR", "JEDIMATHSS",
                         "JEDIMATHST", "JEDIMATHSU"];
         */
                    //Go through the anagram array
                    for (let k = 0; k < anagram.length; k++) {
                        //debugger;
                        //Count the occurances of letters within the current anagram
                        let anagramLetterCount = {};
                        anagram[k].split("").forEach(function (ana, ind, array) {
                            anagramLetterCount[ana] = array.filter(function (filteredAna) {
                                return filteredAna == ana;
                            }).length
                        })
                        //  console.log(anagramLetterCount)

                        //Split the anagram into an array of individual letters
                        let splitAnagramToLetters = anagram[k].split("");
                        // console.log(splitAnagramToLetters)
                        //[S,H,A,V,E,R,S,I,N]

                        //Iterate through that against a loop going through the resulting array of celebs - 
                        //For each resulting celeb, check the matching letters
                        for (let i = 0; i < celebsFromApi.CelebrityValues.length; i++) {

                            //If the length of the word in the anagram array is the same as the name from the api call (with spaces removed)
                            //debugger;
                            if (anagram[k].length === celebsFromApi.CelebrityValues[i].name.toUpperCase().replace(" ", "").replace(/[^A-Z]/g, "").length) {

                                //console.log(anagram[k], data.CelebrityValues[i].name.toUpperCase().replace(" ", ""))
                                //Make an empty object
                                let ind = {};

                                //Iterate through the splitAnagramToLetters array 
                                for (let l = 0; l < splitAnagramToLetters.length; l++) {

                                    //ind[spl[l]] = data.CelebrityValues[i].name.toUpperCase().replace(" ", "").lastIndexOf(spl[l])
                                    // console.log("current Anagram", splitAnagramToLetters[l]);
                                    //If the name from the celebs api array contains the letter from the splitAnagramToLetters array
                                    if (celebsFromApi.CelebrityValues[i].name.toUpperCase().replace(" ", "").includes(splitAnagramToLetters[l])) {

                                        //If the ind object does not contain the current letter from the splitAnagramToLetters array (because that letter has not been checked yet)
                                        if (!ind[splitAnagramToLetters[l]]) {
                                            //var tea = data.CelebrityValues[i].name.toUpperCase().replace(" ", "")
                                            //console.log("We are here", celebsFromApi.CelebrityValues[i].name.toUpperCase().replace(" ", "").split(""));
                                            //Find the amount of times the current letter from the splitAnagramToLetters array shows up in the celebsFromApi name
                                            let anagramLetterInCelebLetterCount = celebsFromApi.CelebrityValues[i].name.toUpperCase().replace(" ", "").split("").filter((data) => data === splitAnagramToLetters[l]).length;
                                            let lettersInAnagramCount = splitAnagramToLetters.filter((data) => data === splitAnagramToLetters[l]).length;
                                            //If the amount of times this letter is found is larger than the amount of times it's in the anagram, then we need to break and leave the loop and move on to the next anagram
                                            if (anagramLetterInCelebLetterCount > (lettersInAnagramCount + 1)) {
                                                //debugger;
                                                break;
                                            }
                                            else {
                                                ind[splitAnagramToLetters[l]] = anagramLetterInCelebLetterCount;
                                                //{A:1,B:3}
                                            }
                                            //Add the splitAnagramToLetters letter into the ind object along with the amount of times the current showed up
                                        }

                                    }
                                }

                                //Compare the 2 objects and count the amount of matches
                                // console.log(anagramLetterCount, ind)
                                let count = 0;
                                let totalCount = 0;
                                //console.log(anagramLetterCount, ind, Object.keys(ind).length, celebsFromApi.CelebrityValues[i].name.toUpperCase().replace(" ", ""))

                                Object.keys(anagramLetterCount).forEach(function (indVal) {
                                    if (ind[indVal] === anagramLetterCount[indVal]) { //console.log(indVal, ind[indVal],anagramLetterCount[indVal] )
                                        count++;
                                    }
                                });

                                //console.log(count, anagram[k], Object.keys(ind).length)
                                totalCount = ((count / Object.keys(anagramLetterCount).length) * 100).toFixed();

                                //console.log(totalCount)
                                //Control the threshold for what is shown in the results
                                if (totalCount >= 80) {
                                    if (!obj[anagram[k]]) {
                                        //Create an empty array is it doesn't
                                        obj[anagram[k]] = []
                                    }
                                    //Push the resulting Celeb and match rate to the obj object
                                    //obj.anagramName = [{Celeb Name: 90}]
                                    obj[anagram[k]].push({ [celebsFromApi.CelebrityValues[i].name]: totalCount + "%" });
                                }
                            }
                        }
                    }

                    console.log(obj)

                    let resultDivContain = document.createElement("div");

                    resultDivContain.className = "resultDivContainer";
                    //If no matching results were found
                    if (Object.keys(obj).length === 0) {

                        ///////////////////
                        //Write to DOM
                        //////////////////

                        let resultDiv = document.createElement("div");
                        //console.log(resultDiv)
                        resultDiv.className = "row mx-auto resultEle";
                        let resulth4 = document.createElement("h4");
                        resulth4.className = "mx-auto";

                        //Write the value of the anagram to the h4 on the page
                        resulth4.innerText = "Nothing was found!";
                        //append div and h4 to end of body
                        document.querySelector(".container.my-5").appendChild(resultDivContain).appendChild(resultDiv).appendChild(resulth4)

                        //If results were found
                    } else {
                        ///////////////////
                        //Write to DOM
                        //////////////////

                        //Create Table
                        let resultTABLE = document.createElement("table");
                        resultTABLE.className = "resultsTABLE table";
                        resultTABLE.classList.add("mt-5")
                        let resultTHEAD = document.createElement("thead");
                        resultTHEAD.className = "thead-dark";
                        let resultTR = document.createElement("tr");
                        let resultThAnagram = document.createElement("th");
                        resultThAnagram.setAttribute("scope", "col");
                        resultThAnagram.innerText = "Anagram";
                        let resultThName = document.createElement("th");
                        resultThName.setAttribute("scope", "col");
                        resultThName.innerText = "Name";
                        let resultThMatch = document.createElement("th");
                        resultThMatch.setAttribute("scope", "col");
                        resultThMatch.innerText = "Match Rate";
                        let resultTBODY = document.createElement("tbody");



                        let tableSetup = document.querySelector(".container.my-5")
                            .appendChild(resultDivContain)
                            .appendChild(resultTABLE)
                            .appendChild(resultTHEAD)
                            .appendChild(resultTR)
                        resultTABLE.appendChild(resultTBODY)
                        resultTHEAD.appendChild(resultThAnagram)
                        resultTHEAD.appendChild(resultThName)
                        resultTHEAD.appendChild(resultThMatch)
                        tableSetup;


                        Object.keys(obj).forEach(function (val, index) {



                            //console.log(resultDiv)
                            // resultDiv.className = "row resultEle";


                            let resultAnagramTR = document.createElement("tr");
                            resultAnagramTR.className = "anagram" + index;

                            let resultAnagramTD = document.createElement("td");
                            //anagram value
                            resultAnagramTD.innerText = val;


                            resultTBODY.appendChild(resultAnagramTR)
                                .appendChild(resultAnagramTD);

                            //loop through array of matches
                            obj[val].forEach(function (objVal) {

                                let resultCelebNameTD = document.createElement("td");
                                let resultCelebNameA = document.createElement("a");
                                let resultCelebMatchTD = document.createElement("td");

                                resultCelebNameA.innerText = Object.keys(objVal)[0];
                                resultCelebNameA.setAttribute("href","https://en.wikipedia.org/wiki/"+Object.keys(objVal)[0]);
                                resultCelebNameA.setAttribute("target","blank");
                                resultCelebMatchTD.innerText = Object.values(objVal)[0];
                                
                                resultCelebNameTD.appendChild(resultCelebNameA);
                                resultAnagramTR.appendChild(resultCelebNameTD);
                                resultAnagramTR.appendChild(resultCelebMatchTD);

                                /*  let resultDiv2 = document.createElement("div");
                                  resultDiv2.className = "row";
                                  document.querySelector(".container.my-5").appendChild(resultDivContain).appendChild(resultDiv2).appendChild(resultP)
                                  //resultDiv2.appendChild(resultP)
                                  */
                                console.log(objVal)
                            })
                        })

                        let resultTFOOT = document.createElement("tfoot");
                        let resultTfooTR = document.createElement("tr");
                        let resultTfooTD = document.createElement("td");
                        resultTfooTD.innerText = "Database provided by Celebritybucks.com";
                        resultTFOOT.id = "tableFooter";


                        resultTfooTR.appendChild(resultTfooTD);
                        resultTFOOT.appendChild(resultTfooTR);
                        resultTABLE.appendChild(resultTFOOT);


                    }
                    //throw new Error("Something went badly wrong!");
                })
            });
        }


        //Listen for the click of the button
        document.getElementById("anagramSubmit").addEventListener("click", celebAnagramFinder);

        //Listen for the enter key press in the Input element
        document.getElementById("anagram").addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("anagramSubmit").click();
            }
        });


    }

   /* if (document.querySelector("#anagramQuerySelect").value === "General") {
        let url = "https://owlbot.info/api/v3/dictionary/"
        let anagram = "";

        fetch(url, { headers: { "Authorization": "Token 123b690d60076e2469ffb435f1a4d82a186bf085" } })
            .then(function (res) {

                if (res.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        res.status);
                    return;
                }

                res.json().then(function (celebsFromApi) { })

                //API key for owlbot.info
                //123b690d60076e2469ffb435f1a4d82a186bf085

            })
            
    }*/
});
