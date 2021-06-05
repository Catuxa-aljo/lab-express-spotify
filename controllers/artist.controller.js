

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

    // Retrieve an access token
    spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));
  

module.exports.search = (req, res, next) => {

    const {artist} = req.query
    spotifyApi.searchArtists(artist)
    .then(data => {
        console.log('The received data from the API: ', data.body);
//return res.json(data.body);
        res.render('artist/artist-search-results', {artists: data.body.artists.items})
    })
    .catch(err => console.log('The error while searching artists occurred: ', err))

}

module.exports.album = (req, res, next) => {
    console.log('hey!')
    const artistId = req.params.artistId
    spotifyApi.getArtistAlbums(artistId)
    .then(albums => {
 //return res.json(albums.body);
        console.log(albums.body.items[0].artists)
        res.render('artist/album', {
            albums: albums.body.items
        })
    })
    .catch(next)
    
}

module.exports.tracklist = (req, res, next) => {
    const albumId = req.params.albumId
    spotifyApi.getAlbumTracks(albumId, { limit : 5, offset : 1 })
    
    .then(tracks => {
        //return res.json(tracks.body);
        res.render('artist/tracklist', {
           tracklist: tracks.body 
        })
    })
    .catch(next)

}   