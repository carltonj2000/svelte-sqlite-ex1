SELECT t.TrackId as id
   , t.Name as name 
   , t.Milliseconds as ms 
 from tracks t
where t.AlbumId = $albumId
order by t.TrackId
