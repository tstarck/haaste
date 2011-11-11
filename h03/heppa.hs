{- heppa.hs -}

import Debug.Trace

{- alphabets in use -}
abc = "ABCDEFGHIJKLMNOPQRSTUVWXY"

{- precalculated hop table for the horsie -}
precalc = [ [7, 11], [8, 10, 12], [5, 9, 11, 13], [6, 12, 14], [7, 13],
            [2, 12, 16], [3, 13, 15, 17], [0, 4, 10, 14, 16, 18], [1, 11, 17, 19], [2, 12, 18],
            [1, 7, 17, 21], [0, 2, 8, 18, 20, 22], [1, 3, 5, 9, 15, 19, 21, 23], [2, 4, 6, 16, 22, 24], [3, 7, 17, 23],
            [6, 12, 22], [5, 7, 13, 23], [6, 8, 10, 14, 20, 24], [7, 9, 11, 21], [8, 12, 22],
            [11, 17], [10, 12, 18], [11, 13, 15, 19], [12, 14, 16], [13, 17] ]

{- board[x] <- abc[i] -}
insert :: Int -> Int -> [Char] -> [Char]
insert i x board = take x board ++ [abc !! i] ++ drop (x + 1) board

print' :: Int -> [Char] -> Int
print' x board = trace (insert 24 x board) 1

{- hop with horsie recursively
 - print if a complete route through the board is found
 - sum up the number of routes
 -}
heppa' :: Int -> Int -> [Char] -> Int
heppa' i x board = if board !! x == ' '
                     then if i < 24
                            then sum
                                   (zipWith3 heppa'
                                     (repeat (i + 1))
                                     (precalc !! x)
                                     (repeat (insert i x board)))
                            else print' x board
                     else 0


{- start at 1st square on an empty board -}
heppa = heppa' 0 0 (take 25 (repeat ' '))

main = putStrLn (show heppa)
