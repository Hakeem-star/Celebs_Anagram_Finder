var obj2 = {};

fetch("https://celebritybucks.com/developers/export/JSON").then(function (res) {

    if (res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            res.status);
        return;
    }

    res.json().then(function (data) {

        // console.log(data.CelebrityValues)
        var obj = {};
        var anagram = ["TRUMCDONALD", "SHAVERSINB", "SHAVERSINC", "SHAVERSINM", "SHAVERSINP", "HASTYMAREA", "HASTYMAREE", "HASTYMAREI", "HASTYMAREL", "HASTYMAREN", "HASTYMAREO", "HASTYMARER", "HASTYMARES", "HASTYMARET", "HASTYMAREU", "SLIMSWINEAREAA", "SLIMSWINEAREAE", "SLIMSWINEAREAI", "SLIMSWINEAREAL", "SLIMSWINEAREAN", "SLIMSWINEAREAO", "SLIMSWINEAREAR", "SLIMSWINEAREAS", "SLIMSWINEAREAT", "SLIMSWINEAREAU", "ROTTENGROANA", "ROTTENGROANE", "ROTTENGROANI", "ROTTENGROANL", "ROTTENGROANN", "ROTTENGROANO", "ROTTENGROANR", "ROTTENGROANS", "ROTTENGROANT", "ROTTENGROANU", "GRIMERTABOOB", "GRIMERTABOOC", "GRIMERTABOOM", "GRIMERTABOOP", "PUTINKARMAF", "PUTINKARMAH", "PUTINKARMAV", "PUTINKARMAW", "PUTINKARMAY", "SLOTHMENWAILA", "SLOTHMENWAILE", "SLOTHMENWAILI", "SLOTHMENWAILL", "SLOTHMENWAILN", "SLOTHMENWAILO", "SLOTHMENWAILR", "SLOTHMENWAILS", "SLOTHMENWAILT", "SLOTHMENWAILU", "BENLAIDLAWB", "BENLAIDLAWC", "BENLAIDLAWM", "BENLAIDLAWP", "ONEMUTTISLANDA", "ONEMUTTISLANDE", "ONEMUTTISLANDI", "ONEMUTTISLANDL", "ONEMUTTISLANDN", "ONEMUTTISLANDO", "ONEMUTTISLANDR", "ONEMUTTISLANDS", "ONEMUTTISLANDT", "ONEMUTTISLANDU", "JEDIMATHSA", "JEDIMATHSE", "JEDIMATHSI", "JEDIMATHSL", "JEDIMATHSN", "JEDIMATHSO", "JEDIMATHSR", "JEDIMATHSS", "JEDIMATHST", "JEDIMATHSU"];

        //Split the anagram into an array of individual letters
        for (var k = 0; k < anagram.length; k++) {

            var spl = anagram[k].split("");
            // console.log(spl)
            //[S,H,A,V,E,R,S,I,N]

            //Iterate through that against a loop going through the resulting array of celebs - 
            //For each resulting celeb, check the matching letters
            for (var i = 0; i < data.CelebrityValues.length; i++) {                

                if (anagram[k].length == data.CelebrityValues[i].name.toUpperCase().replace(" ", "").length) {

                    //console.log(anagram[k], data.CelebrityValues[i].name.toUpperCase().replace(" ", ""))

                    //Iterate through letters per celeb
                    var ind = {};

                    for (var l = 0; l < spl.length; l++) {

                        //ind[spl[l]] = data.CelebrityValues[i].name.toUpperCase().replace(" ", "").lastIndexOf(spl[l])

                        if (data.CelebrityValues[i].name.toUpperCase().replace(" ", "").includes(spl[l])) {

                            if (!ind[spl[l]]) {
                                //var tea = data.CelebrityValues[i].name.toUpperCase().replace(" ", "")

                                ind[spl[l]] = data.CelebrityValues[i].name.toUpperCase().replace(" ", "").split("").filter((data) => data == spl[l]).length - 1;

                            } else {

                                ind[spl[l]] -= 1

                                if (ind[spl[l]] == 0) {
                                    // console.log("gna break")
                                    break;
                                }
                            }
                            //console.log(l, ind)

                            // console.log(data.CelebrityValues[i].name.toUpperCase())

                            if (!obj[[data.CelebrityValues[i].name] + anagram[k]]) {

                                obj[[data.CelebrityValues[i].name] + anagram[k]] = 1;
                                // console.log(obj[[data.CelebrityValues[i].name] + anagram[k]]);

                            } else if (obj[[data.CelebrityValues[i].name] + anagram[k]] > 0) {
                                // console.log(obj[[data.CelebrityValues[i].name]]);
                                obj[[data.CelebrityValues[i].name] + anagram[k]] += 1;
                                //console.log( obj[[data.CelebrityValues[i].name] + anagram[k]])
                            }
                        } else { obj[[data.CelebrityValues[i].name] + anagram[k]] = 0; break; }


                    }

                }
                // console.log(ind,"     ",data.CelebrityValues[i].name.toUpperCase().replace(" ", "") )
                // console.log(ind)

            }
        }




        for (var m = 0; m < anagram.length; m++) {
            // console.log(Object.keys(obj))
            //array of parameters that include anagram name
            var test = Object.keys(obj).filter(
                function (word) {
                    // console.log(word)
                    return word.includes(anagram[m])
                    // return word.includes("Ashlee SimpsonSLOTHMENWAILA")

                });
            //  console.log(test)
            //  console.log(anagram[m].length)
            // console.log(obj)
            //  var obj9 = Object.assign(obj, obj9)
            //   console.log(JSON.stringify(obj9))


            for (var r = 0; r < test.length; r++) {

                if (obj[test[r]] <= (test[r].length - anagram[m].length)) {

                    var help = test[r].length - anagram[m].length - 1;
                    var help2 = obj[test[r]] * 100;
                    obj[test[r]] = help2 / help;

                }
            }

        }

        for (var moo in obj) {
            //console.log(obj);
            if (obj[moo] > 80) {
                obj2[moo] = obj[moo];
            }
        }
        //  console.log(Object.keys(obj).filter((key) => obj[key] > 20))
        console.log(obj2);
    })
})


