const quotesUrl = "https://type.fit/api/quotes";

fetch(quotesUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let randomNum = Math.floor(Math.random() * 16);
    let authorName = data[randomNum].author;
    let commaIndex = authorName.indexOf(',');
    document.getElementById("quotes").innerHTML = data[randomNum].text + "<br><br>" + authorName.substring(0, commaIndex);

    document.getElementById("quotes").addEventListener('click', function() {
      let randomNum2 = Math.floor(Math.random() * 16);
      let authorName2 = data[randomNum2].author;
      let commaIndex2 = authorName2.indexOf(',');
      document.getElementById("quotes").innerHTML = data[randomNum2].text + "<br><br>" + authorName2.substring(0, commaIndex2);
  });
  });

