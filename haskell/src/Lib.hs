{-# LANGUAGE Rank2Types #-}

module Lib where

import Data.Maybe
import Data.Typeable

class Typeable a => Term a where
  gmapT :: (forall b. Term b => b -> b) -> a -> a
  gmapQ :: (forall b. Term b => b -> r) -> a -> [r]

everywhere :: Term a => (forall b. Term b => b -> b) -> a -> a
everywhere f x = f (gmapT (everywhere f) x)

everywhere' :: Term a => (forall b. Term b => b -> b) -> a -> a
everywhere' f x = gmapT (everywhere' f) (f x)

mkT :: (Typeable a, Typeable b) => (b -> b) -> a -> a
mkT f = fromMaybe id (cast f)

everything :: Term a => (r -> r -> r) -> (forall a. Term a => a -> r) -> a -> r
everything k f x = foldl k (f x) (gmapQ (everything k f) x)

mkQ :: (Typeable a, Typeable b) => r -> (b -> r) -> a -> r
(r `mkQ` q) a = maybe r q (cast a)