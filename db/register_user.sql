INSERT INTO heloUsers
(username, hash, profile_pic)
VALUES
($1, $2, $3)
returning *;