{-# LANGUAGE Rank2Types #-}

module Lib where

import Data.Maybe
import Data.Typeable

class Typeable a => Term a where
  gmapT :: (forall b. Term b => b -> b) -> a -> a

everywhere :: Term a => (forall b. Term b => b -> b) -> a -> a
everywhere f x = f (gmapT (everywhere f) x)

everywhere' :: Term a => (forall b. Term b => b -> b) -> a -> a
everywhere' f x = gmapT (everywhere' f) (f x)

mkT :: (Typeable a, Typeable b) => (b -> b) -> a -> a
mkT f = fromMaybe id (cast f)