/*onClick on Search button this portion triggers, gets the search value and fetch API according to that search value */
document.querySelector('.search-btn').addEventListener('click', () => {
    const searchValue = document.querySelector('.search-box input').value;
    document.querySelector('.search-box input').value = "";

    /*URL, from where music list data is fetched */
    const searchURL = `https://api.lyrics.ovh/suggest/${searchValue}`;
    fetch(searchURL)
        .then(res => res.json())
        .then(data => getDataFromApi(data, searchValue))
        .catch(error => { console.log("Error", error) });
})


function getDataFromApi(api, searchValue) {
    /*All got search result will be stored into this html position */
    const htmlPastePosition = document.querySelector("main #music-list")
    htmlPastePosition.innerHTML = `<p>Showing Search Result for: ${searchValue} </p>`;

    for (let i = 0; i < api.data.length; i++) {
        const albumCoverPhoto = api.data[i].album.cover_medium;
        const artistPicture = api.data[i].artist.picture_small;
        const moreOfArtist = api.data[i].artist.link;

        let musicName = api.data[i].title;
        musicName = musicName.replace("'", "");

        let artistName = api.data[i].artist.name;
        artistName = artistName.replace("'", "");

        const musicDuration = Math.floor(api.data[i].duration / 60);
        const liveMusicLink = api.data[i].link;
        const downloadLink = api.data[i].preview;

        /*Inserts a music component each time*/
        htmlPastePosition.innerHTML +=
            `<div class="single-result row align-items-center my-3 p-3">
                <div class="col-lg-9">
                    <div class="row">
                        <div class="col-md-4 d-flex justify-content-md-center">
                            <img class="album-cover" src="${albumCoverPhoto}" alt="Album Cover Picture" />
                        </div>
                        <div class="col-md-8">
                            <h3 class="lyrics-name">${musicName}</h3>
                            <div>
                                <p class="author lead">Album by <span>${artistName}</span></p>
                                <img class="artist-picture" src="${artistPicture}" alt="Artist Picture" />
                            </div>
                            <p>Duration: <span class="badge badge-info">${musicDuration} min</span></p>
                            <a class="listen-music btn btn-info mt-3" href="${liveMusicLink}" target="_blank">Listen Now</a>
                            <a class="listen-music btn btn-info mt-3" href="${downloadLink}" target="_blank">Download</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 text-lg-right">
                    <a class="more-of-artist btn btn-info mt-3" href="${moreOfArtist}" target="_blank">More of ${artistName}</a>
                    <button class="lyrics-btn btn btn-info my-2" onClick='getLyrics("${musicName}", "${artistName}")'>Get Lyrics</button>
                </div>
            </div>`;
    }
}


/*Gets the """"Get Lyrics"""" request from user, fetch the lyrics and present it in front of user*/
function getLyrics(music = 'Tory Lanez', artist = 'NAME') {
    document.querySelector(".background").style.display = "flex";
    document.querySelector(".lyrics").innerHTML = "";

    /*URL, from where lyric of music comes according to user request*/
    const searchURL = `https://api.lyrics.ovh/v1/${artist}/${music}`;
    fetch(searchURL)
        .then(res => res.json())
        .then(data => {
            console.clear();
            console.log(data.lyrics);
            if (data.lyrics !== undefined) {
                document.querySelector(".lyrics").innerHTML = `${data.lyrics}`;
            }
            else {
                document.querySelector(".lyrics").innerHTML = "Sorry!! \nNo lyrics found for this music";
            }
        })
        .catch(error => { console.log("Error", error) })
}


/*Pop up box of lyrics disappears onClick on this """QUIT""" button */
document.querySelector('.quit').addEventListener('click', function () {
    document.querySelector(".background").style.display = "none";
});