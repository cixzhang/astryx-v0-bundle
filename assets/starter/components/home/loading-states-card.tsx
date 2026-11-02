import {Card} from '@astryxdesign/core/Card';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Skeleton} from '@astryxdesign/core/Skeleton';

export function LoadingStatesCard() {
  return (
    <Card padding={5}>
      <VStack gap={4}>
        <VStack gap={3}>
          <HStack gap={3} vAlign="center">
            <Skeleton width={40} height={40} radius="rounded" index={0} />
            <VStack gap={1}>
              <Skeleton width={140} height={14} index={1} />
              <Skeleton width={90} height={12} index={2} />
            </VStack>
          </HStack>
          <Skeleton width="100%" height={14} index={3} />
          <Skeleton width="85%" height={14} index={4} />
          <Skeleton width="65%" height={14} index={5} />
        </VStack>
      </VStack>
    </Card>
  );
}
