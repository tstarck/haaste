 -- heppa.hs

import Debug.Trace

abc = "ABCDEFGHIJKLMNOPQRSTUVWXY"

precalc = [ [7, 11], [8, 10, 12], [5, 9, 11, 13], [6, 12, 14], [7, 13],
            [2, 12, 16], [3, 13, 15, 17], [0, 4, 10, 14, 16, 18], [1, 11, 17, 19], [2, 12, 18],
            [1, 7, 17, 21], [0, 2, 8, 18, 20, 22], [1, 3, 5, 9, 15, 19, 21, 23], [2, 4, 6, 16, 22, 24], [3, 7, 17, 23],
            [6, 12, 22], [5, 7, 13, 23], [6, 8, 10, 14, 20, 24], [7, 9, 11, 21], [8, 12, 22],
            [11, 17], [10, 12, 18], [11, 13, 15, 19], [12, 14, 16], [13, 17] ]

inc = (+ 1)

insert :: Int -> Int -> [Char] -> [Char]
insert i x board = take x board ++ [abc !! i] ++ drop (inc x) board

heppa' :: Int -> Int -> [Char] -> Int
heppa' i x board = if i < 25
                     then if board !! x == ' '
                            then sum
                                   (zipWith3 heppa'
                                     (repeat (inc i))
                                     (precalc !! x)
                                     (repeat (insert i x board)))
                            else 0
                     else 1


heppa = heppa' 0 0 (take 25 (repeat ' '))

main = putStrLn (show heppa)
