SELECT p.*, u.username FROM heloPosts p
JOIN heloUsers u
on u.id = p.author_id