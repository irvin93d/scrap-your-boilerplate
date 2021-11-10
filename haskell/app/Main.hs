{-# LANGUAGE DeriveDataTypeable #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE Rank2Types #-}
{-# LANGUAGE ScopedTypeVariables #-}

module Main where

import Data.Maybe
import Data.Typeable
import GHC.Generics
import Lib
import Unsafe.Coerce

main :: IO ()
main = do
  print genCom
  print $ increase 0.1 genCom
  print $ inc 0.1 genCom

newtype Company = C [Dept] deriving (Show)

data Dept = D Name Manager [SubUnit] deriving (Show)

data SubUnit = PU Employee | DU Dept deriving (Show)

data Employee = E Person Salary deriving (Show)

data Person = P Name Address deriving (Show)

newtype Salary = S Float deriving (Show)

type Manager = Employee

type Name = String

type Address = String

genCom :: Company
genCom =
  C
    [ D "Research" ralf [PU joost, PU marlow],
      D "Strategy" blair []
    ]

ralf, joost, marlow, blair :: Employee
ralf = E (P "Ralf" "Amsterdam") (S 8000)
joost = E (P "Joost" "Amsterdam") (S 1000)
marlow = E (P "Marlow" "Cambridge") (S 2000)
blair = E (P "Blair" "London") (S 100000)

increase :: Float -> Company -> Company
increase k (C ds) = C (map (incD k) ds)

increase' :: Float -> Company -> Company
increase' k = everywhere (mkT (incS k))

instance Term Company where
  gmapT 

inc :: Typeable a => Float -> a -> a
inc k = mkT (incS k)

incD :: Float -> Dept -> Dept
incD k (D nm mgr us) = D nm (incE k mgr) (map (incU k) us)

incU :: Float -> SubUnit -> SubUnit
incU k (PU e) = PU (incE k e)
incU k (DU d) = DU (incD k d)

incE :: Float -> Employee -> Employee
incE k (E p s) = E p (incS k s)

incS :: Float -> Salary -> Salary
incS k (S s) = S (s * (1 + k))

mkT :: (Typeable a, Typeable b) => (b -> b) -> a -> a
mkT f = fromMaybe id (cast f)

-- An abstract class
class Typeable a => Term a where
  gmapT :: (forall b. Term b => b -> b) -> a -> a

everywhere :: Term a => (forall b. Term b => b -> b) -> a -> a
everywhere f x = f (gmapT (everywhere f) x)

everywhere' :: Term a => (forall b. Term b => b -> b) -> a -> a
everywhere' f x = gmapT (everywhere' f) (f x)