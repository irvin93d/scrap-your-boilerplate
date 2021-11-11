{-# LANGUAGE DeriveDataTypeable #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE Rank2Types #-}
{-# LANGUAGE ScopedTypeVariables #-}

module Main where

import Boilerplate
import Data.Maybe
import Data.Typeable
import Debug.Trace
import GHC.Generics
import Lib
import Model
import Unsafe.Coerce

main :: IO ()
main = do
  print genCom
  print $ increase 0.1 genCom
  print $ increase' 0.1 genCom

instance Term a => Term [a] where
  gmapT f [] = []
  gmapT f (x : xs) = f x : f xs

newtype Company = C [Dept] deriving (Show)

instance Term Company where
  gmapT f (C depts) = C (f depts)

data Dept = D Name Manager [SubUnit] deriving (Show)

instance Term Dept where
  gmapT f (D name manager subunits) = D (f name) (f manager) (f subunits)

data SubUnit = PU Employee | DU Dept deriving (Show)

instance Term SubUnit where
  gmapT f (PU empl) = PU (f empl)
  gmapT f (DU dept) = DU (f dept)

data Employee = E Person Salary deriving (Show)

instance Term Employee where
  gmapT f (E per sal) = E (f per) (f sal)

data Person = P Name Address deriving (Show)

instance Term Person where
  gmapT f (P name address) = P (f name) (f address)

newtype Salary = S Float deriving (Show)

instance Term Salary where
  gmapT f (S x) = S (f x)

type Manager = Employee

type Name = String

type Address = String

instance Term Char where
  gmapT f x = x

instance Term Float where
  gmapT f x = x

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
