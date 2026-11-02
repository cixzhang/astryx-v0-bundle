'use client';

import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  CalendarIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
  CodeBracketIcon,
  PhotoIcon,
  PlusIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {
  ChatComposer,
  ChatDictationButton,
  ChatLayout,
  ChatMessage,
  ChatMessageBubble,
  ChatMessageList,
  useSpeechRecognition,
} from '@astryxdesign/core/Chat';
import {Icon} from '@astryxdesign/core/Icon';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Markdown} from '@astryxdesign/core/Markdown';
import {Heading, Text} from '@astryxdesign/core/Text';

type Message = {id: number; sender: 'user' | 'assistant'; text: string};

const suggestions = [
  {label: 'Ask anything', icon: ChatBubbleOvalLeftIcon},
  {label: 'Image', icon: PhotoIcon},
  {label: 'Schedule', icon: CalendarIcon},
  {label: 'Create code', icon: CodeBracketIcon},
  {label: 'Analytics', icon: ChartBarIcon},
];


const cannedReplies = [
  'Good idea. I would build that with Astryx `Card`, `Table`, and `Button` so it picks up the theme automatically.',
  'Sure. Try switching themes in the toolbar, and every component here updates with no extra code.',
  'This is a demo chat, so replies are prewritten. Ask v0 in the real chat to build it for you.',
];

const styles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: 560,
    overflow: 'hidden',
  },
  // ChatLayout scrolls its own messages, so its column parent must fill the card's bounded height.
  body: {
    flexGrow: 1,
    minHeight: 0,
  },
  chips: {
    flexWrap: 'nowrap',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    scrollSnapType: 'x proximity',
    maskImage: 'linear-gradient(to right, black calc(100% - 24px), transparent)',
  },
  greeting: {
    flexGrow: 1,
    // Offsets ChatLayout's bottom scroll padding plus the composer's top gutter
    // so the greeting centers between the header and the suggestion chips.
    paddingTop: 68,
    paddingBottom: 0,
  },
  centerText: {
    textAlign: 'center',
  },
  chip: {
    flexShrink: 0,
    scrollSnapAlign: 'start',
  },
});

export function ChatCard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const dictation = useSpeechRecognition({
    onResult: (transcript) => setDraft((current) => (current ? `${current} ${transcript}` : transcript)),
  });

  function handleSubmit(value: string) {
    const text = value.trim();
    if (!text) return;
    setDraft('');
    setMessages((current) => {
      const reply = cannedReplies[(current.length / 2) % cannedReplies.length];
      return [
        ...current,
        {id: current.length + 1, sender: 'user', text},
        {id: current.length + 2, sender: 'assistant', text: reply},
      ];
    });
  }

  const composer = (
    <VStack gap={3} paddingInline={4} paddingBlockEnd={4}>
      {messages.length === 0 && (
        <HStack gap={2} xstyle={styles.chips}>
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.label}
              label={suggestion.label}
              variant="secondary"
              size="sm"
              icon={<Icon icon={suggestion.icon} size="sm" />}
              onClick={() => handleSubmit(suggestion.label)}
              xstyle={styles.chip}
            />
          ))}
        </HStack>
      )}
      <ChatComposer
        value={draft}
        onChange={setDraft}
        onSubmit={handleSubmit}
        placeholder="Ask anything..."
        elevation="none"
        density="balanced"
        footerActions={
          <Button label="Attach" variant="ghost" isIconOnly icon={<Icon icon={PlusIcon} size="sm" />} />
        }
        sendActions={<ChatDictationButton dictation={dictation} />}
      />
    </VStack>
  );

  return (
    <Card padding={0} xstyle={styles.card}>
      <HStack gap={2} vAlign="center" paddingBlockStart={5} paddingInline={5}>
        <Icon icon={SparklesIcon} size="md" />
        <Text weight="semibold">Agent</Text>
      </HStack>
      <VStack xstyle={styles.body}>
        <ChatLayout composer={composer}>
          {messages.length === 0 ? (
            <VStack gap={1} padding={5} hAlign="center" vAlign="center" xstyle={styles.greeting}>
              <Heading level={2} xstyle={styles.centerText}>How can I help you today?</Heading>
              <Text color="secondary" xstyle={styles.centerText}>Pick a starting point or ask anything.</Text>
            </VStack>
          ) : (
            <ChatMessageList>
              {messages.map((message) => (
                <ChatMessage key={message.id} sender={message.sender}>
                  {message.sender === 'user' ? (
                    <ChatMessageBubble>{message.text}</ChatMessageBubble>
                  ) : (
                    <Markdown density="compact">{message.text}</Markdown>
                  )}
                </ChatMessage>
              ))}
            </ChatMessageList>
          )}
        </ChatLayout>
      </VStack>
    </Card>
  );
}
