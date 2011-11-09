 -- heppa.hs

import Debug.Trace

abc = "ABCDEFGHIJKLMNOPQRSTUVWXY"

loc = [-11, -9, -7, -3, 3, 7, 9, 11]

inc = (+ 1)

insert :: Int -> Int -> [Char] -> [Char]
insert i x board = take x board ++ [abc !! i] ++ drop (inc x) board

heppa' :: Int -> Int -> [Char] -> Int
heppa' i x board = if i <3                                                             -- ei valmis, jaksa solvaamista
                     then if 0 <= x && x < 25 && board !! x == ' '                     -- löydettiin tyhjä paikka laudalta
                            then sum
                                   (zipWith3 heppa'
                                     (repeat (inc i))
                                     (map (+ x) loc)
                                     (repeat (insert i x board)))
                            else 0
                     else trace board 1


heppa = heppa' 0 0 (take 25 (repeat ' '))
