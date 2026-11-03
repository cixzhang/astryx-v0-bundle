'use client';

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Step, Stepper} from '@astryxdesign/core/Stepper';
import {Heading} from '@astryxdesign/core/Text';

const steps = [
  {label: 'Create workspace', description: 'Name it and invite your team'},
  {label: 'Pick a theme', description: 'Try one from the toolbar below'},
  {label: 'Describe your app', description: 'Ask v0 for a page or flow'},
];

export function OnboardingCard() {
  const [activeStep, setActiveStep] = useState(2);
  const isComplete = activeStep > steps.length;

  return (
    <Card padding={5}>
      <VStack gap={4}>
        <Heading level={2}>Set up</Heading>
        <Stepper activeStep={activeStep - 1} orientation="vertical">
          {steps.map((step, index) => (
            <Step
              key={step.label}
              step={index}
              label={step.label}
              description={step.description}
            />
          ))}
        </Stepper>
        <HStack gap={2} justify="between">
          <Button
            label="Back"
            variant="secondary"
            isDisabled={activeStep <= 1}
            onClick={() => setActiveStep((current) => Math.max(1, current - 1))}
          />
          <Button
            label={activeStep >= steps.length ? 'Finish' : 'Next step'}
            variant="primary"
            isDisabled={isComplete}
            onClick={() => setActiveStep((current) => current + 1)}
          />
        </HStack>
      </VStack>
    </Card>
  );
}
