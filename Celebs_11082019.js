//There are some issues with the filter method. Once you find it, you need 
window.addEventListener('load', function () {

    //Listen for the click of the button
    document.querySelector("#anagramSubmit").addEventListener("click", function () {

        //select the resultDivContainer element and empty it
        document.querySelectorAll(".resultDivContainer").forEach(function (el) {
            el.innerHTML = "";
        });

        //write input value to anagram variable
        if (document.querySelector("#anagram").value.toUpperCase().includes(",")) {
            var anagram = document.querySelector("#anagram").value.toUpperCase().replace(/\s/g, '').split(',');
            console.log(anagram)
        } else {
            var anagram = [document.querySelector("#anagram").value.toUpperCase().replace(/\s/g, '')]
        }

        console.log(anagram)

        //Bypass CORS
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://celebritybucks.com/developers/export/JSON'


        //123b690d60076e2469ffb435f1a4d82a186bf085

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
                console.log("Celebs from API", celebsFromApi.CelebrityValues)
                var obj = {};
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
                for (var k = 0; k < anagram.length; k++) {
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
                    var splitAnagramToLetters = anagram[k].split("");
                    // console.log(splitAnagramToLetters)
                    //[S,H,A,V,E,R,S,I,N]

                    //Iterate through that against a loop going through the resulting array of celebs - 
                    //For each resulting celeb, check the matching letters
                    for (var i = 0; i < celebsFromApi.CelebrityValues.length; i++) {

                        //If the length of the word in the anagram array is the same as the name from the api call (with spaces removed)
                        //debugger;
                        if (anagram[k].length === celebsFromApi.CelebrityValues[i].name.toUpperCase().replace(" ", "").length) {

                            //console.log(anagram[k], data.CelebrityValues[i].name.toUpperCase().replace(" ", ""))
                            //Make an empty object
                            var ind = {};

                            //Iterate through the splitAnagramToLetters array 
                            for (var l = 0; l < splitAnagramToLetters.length; l++) {

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
                            console.log(anagramLetterCount,ind,Object.keys(ind).length,celebsFromApi.CelebrityValues[i].name.toUpperCase().replace(" ", ""))
                            
                            Object.keys(anagramLetterCount).forEach(function (indVal) {
                                if (ind[indVal] === anagramLetterCount[indVal]) { //console.log(indVal, ind[indVal],anagramLetterCount[indVal] )
                                    count++;
                                }
                            });

                            console.log(count, anagram[k], Object.keys(ind).length)
                            totalCount = (count / Object.keys(anagramLetterCount).length) * 100

                            console.log(totalCount)
                            if (totalCount >= 80) {
                                if (!obj[anagram[k]]) {
                                    //Create an empty array is it doesn't
                                    obj[anagram[k]] = []
                                }
                                //Push the resulting Celeb and match rate to the obj object
                                obj[anagram[k]].push({ [celebsFromApi.CelebrityValues[i].name]: totalCount });
                            }

                            //After the loop for the anagram, we need to sum up all the matches and see what percentage matches the celeb name
                            //Loop through the ind and sum up all the values, then check what percentage of the celebname that is
                            //Sum of all the matches
                            let matchedCount = Object.values(ind).reduce((a, b) => a + b, 0);
                            //Calculate the percentage
                            let matchedCountPercent = ((matchedCount / celebsFromApi.CelebrityValues[i].name.toUpperCase().replace(" ", "").length) * 100).toFixed();
                            //Then write that result to the obj object as {Anagram name + - + Celeb Name: 90}

                            //If the match rate is above 80%
                            // if (matchedCountPercent > 99) {
                            //     console.log(matchedCountPercent, ind, celebsFromApi.CelebrityValues[i].name.toUpperCase().replace(" ", ""))
                            //     //Check if an obj currently exists with for that anagram                        
                            //     if (!obj[anagram[k]]) {
                            //         //Create an empty array is it doesn't
                            //         obj[anagram[k]] = []
                            //     }
                            //     //Push the resulting Celeb and match rate to the obj object
                            //     obj[anagram[k]].push({ [celebsFromApi.CelebrityValues[i].name]: matchedCountPercent });
                            // }
                        }
                    }
                }

                console.log(obj)

                let resultDivContain = document.createElement("div");

                resultDivContain.className = "resultDivContainer";
                Object.keys(obj).forEach(function (val) {

                    ///////////////////
                    //Write to DOM
                    //////////////////

                    let resultDiv = document.createElement("div");
                    //console.log(resultDiv)
                    resultDiv.className = "row resultEle";
                    let resulth4 = document.createElement("h4");

                    //Write the value of the anagram to the h4 on the page
                    resulth4.innerText = val;
                    //append div and h4 to end of body
                    document.querySelector(".container.my-5").appendChild(resultDivContain).appendChild(resultDiv).appendChild(resulth4)

                    //loop through array of matches
                    obj[val].forEach(function (objVal) {
                        let resultP = document.createElement("p");
                        resultP.innerText = JSON.stringify(objVal);
                        let resultDiv2 = document.createElement("div");
                        resultDiv2.className = "row";
                        document.querySelector(".container.my-5").appendChild(resultDivContain).appendChild(resultDiv2).appendChild(resultP)
                        //resultDiv2.appendChild(resultP)
                        //console.log(objVal)
                    })
                    //console.log(Object.values(obj))
                })
                //throw new Error("Something went badly wrong!");
            })
        });

    });
});