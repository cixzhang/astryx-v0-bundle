import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {SyntaxTheme, defineSyntaxTheme} from '@astryxdesign/core/theme';

export const astryxV0SyntaxTheme = defineSyntaxTheme({
  name: 'astryx-v0-syntax',
  tokens: {
    keyword: ['#6A36B5', '#D7B5FF'],
    string: ['#08783E', '#7EE2A8'],
    comment: ['#667085', '#98A2B3'],
    number: ['#B54708', '#FDBA74'],
    function: ['#075EBC', '#70B7FF'],
    type: ['#9E165F', '#F9A8D4'],
    variable: ['#344054', '#F2F4F7'],
    operator: ['#475467', '#D0D5DD'],
    constant: ['#B42318', '#FDA29B'],
    tag: ['#0E7090', '#67E8F9'],
    attribute: ['#9E165F', '#F0ABFC'],
    property: ['#175CD3', '#93C5FD'],
    punctuation: ['#475467', '#D0D5DD'],
    background: ['#F8FAFC', '#101828'],
  },
});

const code = `const theme = defineTheme({\n  name: 'product',\n  extends: neutralTheme,\n});`;

export default function SyntaxThemeExample() {
  return (
    <SyntaxTheme theme={astryxV0SyntaxTheme}>
      <CodeBlock
        code={code}
        language="typescript"
        title="product-theme.ts"
        hasLineNumbers
        hasCopyButton
      />
    </SyntaxTheme>
  );
}
