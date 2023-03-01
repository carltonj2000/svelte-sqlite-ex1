SELECT t.TrackId as trackId
   , t.Name as trackName 
   , a.AlbumId as albumId
   , a.Title as albumTitle
   , at.ArtistId as artistId
   , at.Name as artistName
   , g.Name as genre
 from tracks t
 join albums a
   on t.AlbumId = a.AlbumId
 join artists at
   on a.ArtistId = at.ArtistId
join genres g
   on t.GenreId = g.GenreId
where lower(t.Name) like lower('%' || $searchTerm || '%')
limit $limit
