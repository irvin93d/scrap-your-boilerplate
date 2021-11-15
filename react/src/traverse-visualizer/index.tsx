import { useState } from 'react'

import { Button } from '../components/Button'
import { HStack, VStack } from '../components/Stack'
import { DataHighlight } from './data-highlight'
import { ExhaustiveTraverse } from './exhaustive'
import { FadeIn } from './FadeIn'
import { NaiveTraverse } from './naive'

export const TraverseVisualizer = () => {
  const [view, setView] = useState<'data' | 'naive' | 'exhaustive'>('data')
  const View = (() => {
    switch (view) {
      case 'data':
        return DataHighlight
      case 'naive':
        return NaiveTraverse
      case 'exhaustive':
        return ExhaustiveTraverse
    }
  })()
  return (
    <VStack>
      <HStack justifyContent="flex-start">
        <Button onClick={() => setView('data')}>Data structure</Button>
        <Button onClick={() => setView('naive')}>Naive traverse</Button>
        <Button onClick={() => setView('exhaustive')}>Exhaustive Traverse</Button>
      </HStack>
      <FadeIn key={view}>
        <View />
      </FadeIn>
    </VStack>
  )
}
