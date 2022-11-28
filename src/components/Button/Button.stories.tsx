import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonSize, ButtonVariant } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
	title: "Example/Button",
	component: Button,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/react/writing-docs/docs-page
	tags: ["docsPage"],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args
	args: {
		variant: ButtonVariant.PRIMARY,
		children: "Button",
	},
};

export const Secondary: Story = {
	args: {
		variant: ButtonVariant.SECONDARY,
		children: "Button",
	},
};

export const Ghost: Story = {
	args: {
		variant: ButtonVariant.GHOST,
		children: "Button",
	},
};

export const Small: Story = {
	args: {
		size: ButtonSize.SMALL,
		children: "Button",
	},
};

export const Medium: Story = {
	args: {
		size: ButtonSize.MEDIUM,
		children: "Button",
	},
};

export const Large: Story = {
	args: {
		size: ButtonSize.LARGE,
		children: "Button",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Button",
	},
};
