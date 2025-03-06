# colors

Color palette generator

## Demo

[https://ozgrozer.github.io/colors/](https://ozgrozer.github.io/colors/)

## Features

- Generate and customize color palettes
- Export color palettes in CSS, SCSS, and JS formats
- Chat with a color assistant for suggestions
- Export ShadCN UI theme based on your color palette (requires LLM configuration)

## Preview

<img src="./preview/Front Page.png" alt="" width="600" />

## Using the Color Assistant

The Color Assistant is an AI-powered feature that helps you create and refine your color palettes:

1. Click the chat icon in the header to open the Color Assistant
2. Type your color-related questions or requests, such as:
   - "Suggest complementary colors for my palette"
   - "Create a monochromatic palette based on my first color"
   - "Analyze my current palette and suggest improvements"
   - "Generate a palette for a modern website"
3. The assistant will respond with suggestions and color theory advice
4. Click on suggested colors to add them to your palette

The Color Assistant operates in two modes:

### Basic Mode (Default)

In basic mode, the assistant uses rule-based logic to provide color suggestions based on common color theory principles:
- Complementary color suggestions
- Similar color matching
- Random color generation
- Basic palette analysis

No external API or configuration is required for basic mode.

### LLM-Enhanced Mode

For more advanced capabilities, you can connect the Color Assistant to an external Large Language Model (LLM):

1. Click the settings icon in the chat modal
2. Enable "Use External LLM"
3. Enter your API endpoint (e.g., OpenAI API URL)
4. Enter your API key
5. Save settings

With LLM integration, the Color Assistant gains enhanced capabilities:
- Detailed color theory explanations
- Context-aware color suggestions
- Advanced palette analysis and recommendations
- Custom color schemes for specific design needs
- ShadCN UI theme generation

<img src="./preview/Color Assistant.png" alt="" width="600" />

## Using the ShadCN Export Feature

The ShadCN export feature generates a complete global.css file for ShadCN UI components based on your current color palette. To use this feature:

1. Open the chat settings (chat icon in the header -> settings icon)
2. Enable "Use External LLM" and configure your API endpoint and key
3. Open the Export Palette modal and select the "ShadCN" tab
4. Click "Generate ShadCN Styles" to create a ready-to-use global.css file

The generated file follows the standard ShadCN UI theme format with both light and dark themes, using HSL color format:

```css
:root {
  /* Light theme variables */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* etc. */
}

.dark {
  /* Dark theme variables */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* etc. */
}
```

The HSL format represents colors using:
- Hue (H): angle in degrees (0-360)
- Saturation (S): percentage (0%-100%)
- Lightness (L): percentage (0%-100%)

This file can be used directly in your ShadCN UI projects by copying it to your global.css file or integrating the variables into your existing theme.

<img src="./preview/Shadcn Export" alt="" width="600" />

## License

[GPL-3.0](./license)
