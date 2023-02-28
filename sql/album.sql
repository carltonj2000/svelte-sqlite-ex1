SELECT a.AlbumId as id
   , a.Title as title
   , at.Name as name
 from albums a
   join artists at on a.ArtistId = at.ArtistId
where a.AlbumId = $albumId 
